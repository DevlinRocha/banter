# Banter - A Discord Clone

Banter is a feature-rich Discord clone built with React, Redux Toolkit, Next.JS, TypeScript, styled-components, Tailwind CSS, and uses Firebase to communicate with the back-end.

[Join the conversation!](https://banter-kappa.vercel.app/) 👈

## Features

- Send messages with gifs, images, videos, or text.
- Customize profile avatar, banner, bio, username, and more.
- Use a guest account or register to save credentials.
- Chat with people around the world in global server.
- Create a server and invite others with a unique code.
- Customize the server icon, name, and moderation content filter for gifs.
- Create separate channels within the server to discuss different topics.
- Create and customize different roles to assign members of the server.

## Getting Started

Instructions to run the project locally are below! A [Firebase](https://firebase.google.com/) account is required.

1. Clone the repository:

```bash
git clone https://github.com/DevlinRocha/banter.git

# or

git clone git@github.com:DevlinRocha/banter.git
```

2. Go into the directory and install the modules:

```bash
cd banter/

npm install

# or

yarn install
```

3. Create a new project on Firebase.
   - Go to [Firebase](https://firebase.google.com/) → Get Started / Go to console → Add project
   - You can name it anything you want. Analytics are not recommended.
4. Enable Firestore.
   - Go to Firestore Database → Create database
5. Register a web app for the project.
   - Go to Project Overview and select the `</>` (Web) icon.
   - You can name it anything. Hosting is not required.
6. Take each config value given and create a new `.env.local` file in `banter/` root folder.
   - Can be found in Project settings → General → Your apps → SDK setup and configuration → Config
7. Paste the following into the new file. Replace each value with given values from Firebase web app config.

```
NEXT_PUBLIC_FIREBASE_API_KEY = apiKeyValue
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = authDomainValue
NEXT_PUBLIC_FIREBASE_PROJECT_ID = projectIdValue
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = storageBucketValue
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = messagingSenderIdValue
NEXT_PUBLIC_FIREBASE_APP_ID = appIdValue
```

8. Run the development server:

```bash
npm run dev

# or

yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Development

- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Next.JS](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [styled-components](https://styled-components.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
- [Tenor API](https://tenor.com/gifapi/)
