# Banter - A Discord Clone

Banter is a full-stack Discord clone built with React, Redux Toolkit, Next.JS, TypeScript, styled-components, Tailwind CSS, and uses Firebase to communicate with the back-end.

[Join the conversation!](https://banter-kappa.vercel.app/) 👈

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

3. Create a new project on Firebase. You can name it anything you want. Analytics are not recommended.

4. Add the project to a web app. You can name it anything. Hosting is not required.

5. Take the config values they give you and create a new `.env.local` file in `banter/` root folder.

6. Paste the following into the new file. Replace the text wrapped in `""` with the corresponding value from Firebase:

```
NEXT_PUBLIC_FIREBASE_API_KEY = "apiKeyValue"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = "authDomainValue"
NEXT_PUBLIC_FIREBASE_PROJECT_ID = "projectIdValue"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = "storageBucketValue"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = "messagingSenderIdValue"
NEXT_PUBLIC_FIREBASE_APP_ID = "appIdValue"
```

7. Run the development server:

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
 
