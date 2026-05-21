import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const gptMovies = useSelector((store) => store.gpt.gptMovies);

  if (!gptMovies) return null;

  const { movieNames, movieResults } = gptMovies;

  return (
    <div className="bg-black/85 backdrop-blur-sm p-2 sm:p-4 md:p-6 
      mx-2 sm:mx-4 md:mx-8 mt-4 sm:mt-6 rounded-lg">
      {movieNames?.map((movieName, index) => (
        <MovieList
          key={movieName}
          title={movieName}
          movies={movieResults[index]}
        />
      ))}
    </div>
  );
};

export default GptMovieSuggestions;