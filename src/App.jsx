import { useEffect, useState } from 'react'
import './index.css'
import axios from 'axios'

function App() {
  const [data, setData] = useState('')
  const [input, setInput] = useState('')
  const [showMore, setShowMore] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [trailer, setTrailer] = useState('')
  const [similarMovies, setSimilarMovies] = useState([])
  const omdbApi = '5718f5b3'
  const youtubeApi = 'YOUR_YOUTUBE_API_KEY' // Replace with your YouTube API key

  async function getData() {
    const url = `https://www.omdbapi.com/?apikey=${omdbApi}&t=${input}&plot=full`
    try {
      const response = await axios.get(url)
      setData(response.data)
      console.log(response.data)
      getTrailer(response.data.Title + ' trailer')
      getSimilarMovies(response.data.Genre)
    } catch (error) {
      console.log("There was an error fetching movie data")
    }
  }

  async function getTrailer(searchQuery) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&key=${youtubeApi}`
    try {
      const response = await axios.get(url)
      if (response.data.items.length > 0) {
        setTrailer(response.data.items[0].id.videoId)
      }
    } catch (error) {
      console.log("There was an error fetching the trailer")
    }
  }

  async function getSimilarMovies(genre, language) {
    const firstGenre = genre.split(',')[0].trim()
    const url = `https://www.omdbapi.com/?apikey=${omdbApi}&s=${firstGenre}&type=movie`
    try {
      const response = await axios.get(url)
      if (response.data.Search) {
        const filteredMovies = response.data.Search.filter(movie => movie.Language === language).slice(0, 6)
        setSimilarMovies(filteredMovies)
      }
    } catch (error) {
      console.log("There was an error fetching similar movies")
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handleButtonClick = () => {
    getData()
    setInput('')
    setSimilarMovies('')
  }

  const showMoreInfo = () => {
    setShowMore(!showMore)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const renderStarRating = (rating) => {
    // ... (keep your existing renderStarRating function)
  }

  
  return (
<div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <button className="absolute top-5 right-5 text-2xl bg-transparent border-none cursor-pointer" onClick={toggleDarkMode}>
        {darkMode ? '🌙' : '☀️'}
      </button>
      <h1 className="text-4xl md:text-5xl font-bold text-center py-8 text-pink-600 dark:text-pink-400 animate-fadeIn">Welcome to Hollywood</h1>
      <div className="flex justify-center mb-8">
        <input
          type="text"
          className="py-2 px-4 w-64 md:w-80 text-lg border-2 border-pink-500 rounded-l-md focus:outline-none focus:ring-2 focus:ring-pink-300 dark:bg-gray-700 dark:text-white"
          placeholder='Enter Movie name'
          onChange={e => setInput(e.target.value)}
          value={input}
        />
        <button className="py-2 px-6 text-lg bg-pink-500 text-white rounded-r-md hover:bg-pink-600 transition duration-300" onClick={handleButtonClick}>
          Search 🔎
        </button>
      </div>
      {data.Title && (
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-fadeIn">
          <div className="md:flex">
            {data.Poster && (
              <img src={data.Poster} alt={data.Title} className="w-full md:w-1/3 object-cover" />
            )}
            <div className="p-6 md:w-2/3">
              <h2 className="text-3xl font-bold mb-4 text-pink-600 dark:text-pink-400">{data.Title}</h2>
              <p className="mb-2">Release Year: {data.Year}</p>
              <p className="mb-4">{data.Plot}</p>
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2 text-pink-600 dark:text-pink-400">Cast & Crew</h3>
                <p><strong>Director:</strong> {data.Director}</p>
                <p><strong>Writers:</strong> {data.Writer}</p>
                <p><strong>Actors:</strong> {data.Actors}</p>
              </div>
              {showMore && (
                <div className="mb-4 animate-fadeIn">
                  <p>Rating: {data.Rated}</p>
                  <p>Runtime: {data.Runtime}</p>
                  <p>Genre: {data.Genre}</p>
                  <p>Awards: {data.Awards}</p>
                </div>
              )}
              <button 
                className="mt-4 py-2 px-4 bg-pink-500 text-white rounded hover:bg-pink-600 transition duration-300"
                onClick={showMoreInfo}
              >
                {showMore ? 'Show Less' : 'Show More'}
              </button>
            </div>
          </div>
          <div className="p-6 bg-gray-100 dark:bg-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-pink-600 dark:text-pink-400">Ratings</h3>
            <div className="flex flex-wrap justify-around">
              {data.Ratings && data.Ratings.map((rating, index) => (
                <div key={index} className="text-center mb-4">
                  <h4 className="font-semibold">{rating.Source}</h4>
                  <p>{rating.Value}</p>
                  {rating.Source === 'Internet Movie Database' && renderStarRating(rating.Value)}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {trailer && (
        <div className="mt-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4 text-pink-600 dark:text-pink-400">Trailer</h3>
          <div className="aspect-w-16 aspect-h-9">
            <iframe 
              src={`https://www.youtube.com/embed/${trailer}`}
              title="Movie Trailer" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
      {similarMovies.length > 0 && (
        <div className="mt-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4 text-pink-600 dark:text-pink-400">Similar Movies</h3>
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {similarMovies.map((movie, index) => (
              <div key={index} className="flex-shrink-0 w-32">
                <img src={movie.Poster} alt={movie.Title} className="w-full h-48 object-cover rounded-md" />
                <p className="mt-2 text-center text-sm">{movie.Title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

}

export default App