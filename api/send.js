// /api/send.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed');
    }
  
    // Récupérer le webhook depuis les variables d'environnement
    const webhook = process.env.DISCORD_WEBHOOK_URL;
  
    // Si la variable d'environnement n'est pas définie, on retourne une erreur
    if (!webhook) {
      return res.status(500).send('Webhook URL manquant');
    }
  
    const { content } = req.body;
  
    try {
      const discordRes = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });
  
      // Vérifier la réponse du webhook
      if (discordRes.ok) {
        return res.status(200).send('Message envoyé avec succès');
      } else {
        return res.status(discordRes.status).send('Erreur en envoyant le message');
      }
    } catch (error) {
      return res.status(500).send('Erreur interne du serveur');
    }
  }
  