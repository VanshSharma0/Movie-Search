# Movie Search App

## Overview

The Movie Search App is a simple and intuitive application that allows users to search for movies and view detailed information about them. The app also provides a list of similar movies to help users discover new films based on their interests.

## Features

- **Movie Search:** Users can search for movies by entering keywords in the search bar.
- **Movie Details:** Displays detailed information about the selected movie, including title, release date, genre, overview, and rating.
- **Similar Movies:** Lists movies that are similar to the selected movie, helping users find new movies they might enjoy.

## Installation

To run the Movie Search App locally, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/VanshSharma0/Movie-Search.git
   cd Movie-Search
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm start
   ```

4. **Open the app:**
   Open your browser and navigate to `http://localhost:3000` to see the app in action.

## Usage

1. **Search for a movie:**
   - Enter a movie title or keywords in the search bar and press enter or click the search button.

2. **View movie details:**
   - Click on a movie from the search results to view detailed information about it.

3. **Explore similar movies:**
   - Scroll down to see a list of movies similar to the selected movie.

## Technologies Used

- **React.js:** For building the user interface.
- **Axios:** For making API requests to fetch movie data.
- **TailWindCSS:** For styling the application.

## API

The app uses the [TMDb (The Movie Database) API](https://www.themoviedb.org/documentation/api) to fetch movie data. You will need to sign up for an API key from TMDb and add it to your project.

1. **Get your API key:**
   - Sign up at [TMDb](https://www.themoviedb.org/signup) and get your API key.

2. **Add the API key to your project:**
   - Create a `.env` file in the root of your project and add your API key:
     ```sh
     REACT_APP_TMDB_API_KEY=your_api_key_here
     ```

## Contributing

Contributions are welcome! If you have any ideas or improvements, feel free to submit a pull request or open an issue.

## Contact

If you have any questions or suggestions, feel free to reach out to me at (vanished934@gmail.com).

---

Happy movie searching!

---

