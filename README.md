# Movies App

This project is a movie tracking application that allows users to search for movies, view trending movies, and track the movies they have watched. The project was built using React for the frontend and Appwrite for backend services. Link: [Movies](https://movies-janr.netlify.app/).

## 📋 <a name="table">Table of Contents</a>

1. ⚙️ [Tech Stack](#tech-stack)
2. ✨ [Features](#features)
3. 🚀 [Getting Started](#getting-started)
4. ▶️ [Running Application](#running-application)

## <a name="tech-stack">⚙️ Tech Stack</a>

- React.js
- Appwrite
- Tailwind CSS
- TMDB API

## <a name="features">✨ Features</a>

- **Browse All Movies**: Discover a vast selection of movies available on the platform.

- **Search Movies**: Effortlessly search for specific movies using the search functionality.

- **Trending Movies Algorithm**: Showcases trending movies based on a dynamic algorithm.

- **Modern UI/UX**: Enjoy a sleek and user-friendly interface designed for an exceptional experience.

- **Responsiveness**: Experience a fully responsive design that works seamlessly across all devices.


## <a name="getting-started">🚀 Getting Started</a>

1. Make sure you have the following items installed before starting the application:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm): Node Package Manager (supplied with Node.js)

2. Clone the repository to your local machine:
```sh
git clone https://github.com/janrzepkowski/Movies.git
```

3. Open IDE and navigate to the cloned repository

4. Install the required packages:
```sh
npm install
```

5. Set up environment variables by creating a new file named `.env` in the root of your project and add the following content:

```env
VITE_IMDB_API_KEY=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_COLLECTION_ID=
```

Replace the placeholder values with your actual **[TheMovieDatabase API](https://developer.themoviedb.org/reference/intro/getting-started)** and **[Appwrite](https://cloud.appwrite.io/console/account/organizations)** credentials. You can obtain these credentials by signing up on the [TheMovieDatabase](https://developer.themoviedb.org/reference/intro/getting-started) and creating a new project on the [Appwrite](https://cloud.appwrite.io/console/account/organizations)
 

## <a name="running-application">▶️ Running Application</a>

1. From the Movies directory, start the application:
```sh
npm run dev
```

2. The Movies application will be available at `http://localhost:5173` in your web browser.

#### Voilà!
