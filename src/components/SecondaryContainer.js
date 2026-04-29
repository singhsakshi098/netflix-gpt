import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  if (!movies?.nowPlayingMovies) return null;

  return (
    <div className="relative z-20 -mt-24 md:-mt-28 lg:-mt-32">
      {/* 🎬 Smooth overlap WITHOUT strip */}
      <div className="px-4 sm:px-8 md:px-12 pt-6 pb-20">

        <MovieList title="Now Playing" movies={movies.nowPlayingMovies} />
        <MovieList title="Popular" movies={movies.PopularMovies} />
        <MovieList title="Top Rated" movies={movies.TopRatedMovies} />
        <MovieList title="Upcoming Movies" movies={movies.UpcomingMovies} />
        <MovieList title="Upcoming Movies" movies={movies.UpcomingMovies} />
        <MovieList title="Top Rated" movies={movies.TopRatedMovies} />

      </div>
    </div>
  );
};

export default SecondaryContainer;