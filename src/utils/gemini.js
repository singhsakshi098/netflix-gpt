import { API_OPTIONS } from "./constants";

// Search TMDB for movies matching the query
const searchMovies = async (query) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`,
    API_OPTIONS
  );
  const data = await res.json();
  return data.results || [];
};

// Get recommendations based on a movie ID
const getRecommendations = async (movieId) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`,
    API_OPTIONS
  );
  const data = await res.json();
  return data.results || [];
};

// Get similar movies based on a movie ID
const getSimilar = async (movieId) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`,
    API_OPTIONS
  );
  const data = await res.json();
  return data.results || [];
};

/**
 * Smart search: searches TMDB, then fetches recommendations & similar
 * for the top results — gives a rich, multi-row suggestion layout.
 */
export const smartMovieSearch = async (query) => {
  const searchResults = await searchMovies(query);

  if (!searchResults.length) return { movieNames: [], movieResults: [] };

  // Pick top 3 results that have posters
  const topMovies = searchResults.filter((m) => m.poster_path).slice(0, 3);

  const movieNames = [];
  const movieResults = [];

  // First row: direct search results
  movieNames.push(`Results for "${query}"`);
  movieResults.push(searchResults.filter((m) => m.poster_path).slice(0, 20));

  // For each top result, fetch recommendations
  for (const movie of topMovies) {
    const recs = await getRecommendations(movie.id);
    if (recs.length > 0) {
      movieNames.push(`Because you like "${movie.title}"`);
      movieResults.push(recs.filter((m) => m.poster_path).slice(0, 20));
    }
  }

  // If we have fewer than 4 rows, add similar movies from the #1 result
  if (movieResults.length < 4 && topMovies.length > 0) {
    const similar = await getSimilar(topMovies[0].id);
    if (similar.length > 0) {
      movieNames.push(`Similar to "${topMovies[0].title}"`);
      movieResults.push(similar.filter((m) => m.poster_path).slice(0, 20));
    }
  }

  return { movieNames, movieResults };
};