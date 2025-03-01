import { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import Pagination from "./components/Pagination";
import { updateSearchCount, getTrendingMovies } from "./appwrite.js";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    accept: "application/json",
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async (query = "", page = 1) => {
    setErrorMessage("");
    setIsLoading(true);

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
            query
          )}&page=${page}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("An error occurred while fetching movies.");
      }

      const data = await response.json();

      if (data.response === "False") {
        setErrorMessage(
          data.Error || "An error occurred while fetching movies."
        );
      }

      setMovies(data.results || []);
      setTotalPages(data.total_pages || 1);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while fetching movies.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTrendingMovies = async () => {
    try {
      const data = await getTrendingMovies();
      setTrendingMovies(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [, cancel] = useDebounce(
    () => {
      fetchMovies(searchTerm, 1);
      setCurrentPage(1);
    },
    500,
    [searchTerm]
  );

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      fetchMovies(searchTerm, nextPage);
      setCurrentPage(nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      fetchMovies(searchTerm, previousPage);
      setCurrentPage(previousPage);
    }
  };

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="Hero Banner" />
          <h1>
            Track <span className="text-gradient">movies</span> you’ve watched.
            Tell your friends what’s good.{" "}
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <>
              <ul>
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPreviousPage={handlePreviousPage}
                onNextPage={handleNextPage}
              />
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
