// /api/send.js
const rateLimitWindowMs = 60 * 1000; // 1 minute
const maxRequestsPerWindow = 5;

const ipRequestsMap = new Map();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) {
    return res.status(500).send('Webhook URL manquant');
  }

  // Récupérer l'IP client (Vercel set souvent x-forwarded-for)
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '';

  // Nettoyer les requêtes expirées
  const now = Date.now();
  if (ipRequestsMap.has(ip)) {
    const timestamps = ipRequestsMap.get(ip).filter(ts => now - ts < rateLimitWindowMs);
    ipRequestsMap.set(ip, timestamps);
  } else {
    ipRequestsMap.set(ip, []);
  }

  const timestamps = ipRequestsMap.get(ip);

  if (timestamps.length >= maxRequestsPerWindow) {
    return res.status(429).send('Trop de requêtes. Veuillez réessayer plus tard.');
  }

  // Ajouter la requête actuelle
  timestamps.push(now);
  ipRequestsMap.set(ip, timestamps);

  const { content } = req.body;

  try {
    const discordRes = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });

    if (discordRes.ok) {
      return res.status(200).send('Message envoyé avec succès');
    } else {
      return res.status(discordRes.status).send('Erreur en envoyant le message');
    }
  } catch (error) {
    return res.status(500).send('Erreur interne du serveur');
  }
}
