import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies) return null;
  return (
    <div className="py-3 sm:py-4">
      <h2 className="text-white font-semibold mb-3 px-1 text-base sm:text-lg">
        {title}
      </h2>
      <div
        className="flex gap-2 sm:gap-3 pb-4"
        style={{
          overflowX: "auto",
          overflowY: "visible",   /* ← lets hover scale show fully */
          scrollbarWidth: "none",
          msOverflowStyle: "none",
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