import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies || movies.length === 0) return null;
  return (
    <div className="py-2 sm:py-4">
      <h2 className="text-white font-semibold mb-2 sm:mb-3
        text-sm sm:text-base md:text-lg tracking-wide">
        {title}
      </h2>

      {/* py-4 + -my-4 trick: lets hover scale bleed without clipping */}
      <div
        className="-my-4 py-4 flex gap-1.5 sm:gap-2 md:gap-3"
        style={{
          overflowX: "auto",
          overflowY: "visible",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch", // smooth scroll on iOS
        }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} posterPath={movie.poster_path} />
        ))}
      </div>
    </div>
  );
};
export default MovieList;