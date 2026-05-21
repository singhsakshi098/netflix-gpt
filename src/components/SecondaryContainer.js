import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  if (!movies?.nowPlayingMovies) return null;

  return (
    <div className="relative z-30 -mt-[150px]">
      {/* Transparent top so video shows through, fades to solid quickly */}
      <div
        className="px-4 sm:px-8 md:px-12 lg:px-16 pt-4 pb-20"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, #141414 5%)",
        }}
      >
        <MovieList title="Now Playing"     movies={movies.nowPlayingMovies} />
        <MovieList title="Popular"         movies={movies.PopularMovies} />
        <MovieList title="Top Rated"       movies={movies.TopRatedMovies} />
        <MovieList title="Upcoming Movies" movies={movies.UpcomingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;