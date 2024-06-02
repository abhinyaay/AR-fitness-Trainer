
# AR Fitness (Artificial Intelligence Fitness Trainer)

A React + MediaPipe web app that uses your webcam to track body pose in real
time and coach you through exercises (bicep curls, squats, push-ups, crunches)
and yoga poses, with rep counting and form feedback.

- Tech Stack
- Features

# Demo
- Live: https://abhinyaay.github.io/AR-Fitness-Trainer/

> The app needs camera access and must be served over HTTPS (GitHub Pages
> provides this). Google sign-in is optional — the pose-tracking workouts work
> without it.

# Run locally

```bash
npm install
npm start
```

Copy `.env.example` to `.env` and fill in your own Firebase keys if you want
Google sign-in locally.

# Deployment (GitHub Pages)

This repo auto-deploys to GitHub Pages via GitHub Actions
([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) on every push to
`main`. The site is served from the `/AR-Fitness-Trainer/` sub-path, which is
why `homepage` is set in `package.json` and the router uses `basename`. A
`404.html` redirect (the spa-github-pages trick) keeps client-side deep links
working.

## Configure your own Firebase (optional, for Google sign-in)

Nothing is hardcoded to any Firebase project — all credentials come from
`REACT_APP_FIREBASE_*` env vars. To enable Google sign-in on the deployed site:

1. Create a Firebase project and register a Web app
   (Console → Project settings → Your apps).
2. Enable **Authentication → Sign-in method → Google**.
3. Under Authentication → Settings → **Authorized domains**, add
   `abhinyaay.github.io`.
4. Add each value from the SDK config as a repository **Secret**
   (Settings → Secrets and variables → Actions):
   `REACT_APP_FIREBASE_API_KEY`, `REACT_APP_FIREBASE_AUTH_DOMAIN`,
   `REACT_APP_FIREBASE_PROJECT_ID`, `REACT_APP_FIREBASE_STORAGE_BUCKET`,
   `REACT_APP_FIREBASE_MESSAGE_ID`, `REACT_APP_FIREBASE_APP_ID`.

Without these the site still runs fully; only Google login is disabled.

# Front-End 
- React, a popular front-end framework, to build our user interface in a modular and scalable way. React's component-based architecture makes it easy for us to manage the various elements of our UI, and its virtual DOM ensures that our application is highly performant.
- Material UI is a popular React component library that provides pre-built and customizable UI components following Google's Material Design guidelines. These components can be used to build beautiful and responsive user interfaces with ease.



# Back-End
## Firebase:
Firebase is a cloud-based platform that provides a range of services and tools for building and managing web and mobile applications. Some of the key features of Firebase include:

- Realtime Database: a NoSQL database that allows you to store and sync data in real-time across multiple clients.
- Authentication: a service that allows you to easily add user authentication and identity management to your app.
- Hosting: a service that allows you to deploy and serve your web app with a scalable and secure hosting solution. 

## Mediapipe
- Mediapipe is an open-source framework developed by Google that provides tools for building real-time computer vision applications.
- We chose to use Mediapipe specifically for its pose detection capabilities, which allow us to accurately estimate the positions of 33 key body landmarks in real time.
  




