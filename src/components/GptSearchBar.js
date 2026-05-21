import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { smartMovieSearch } from "../utils/gemini";
import lang from "../utils/languageConstants";
import { addGptMoviesResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGptSearchClick = async () => {
    if (!searchText.current.value.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const { movieNames, movieResults } = await smartMovieSearch(
        searchText.current.value
      );

      if (!movieNames.length) {
        setError("No movies found. Try a different search.");
        setLoading(false);
        return;
      }

      dispatch(addGptMoviesResult({ movieNames, movieResults }));
    } catch (err) {
      console.error("Search error:", err);
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="pt-[25%] sm:pt-[8%] flex flex-col items-center px-3 sm:px-4">
      <form
        className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12
          flex flex-col sm:flex-row rounded-lg overflow-hidden 
          shadow-lg shadow-black/50"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="p-3 sm:p-4 flex-1 text-black text-sm sm:text-base
            outline-none placeholder:text-gray-500"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="px-4 sm:px-8 py-3 sm:py-4 bg-red-700 text-white font-semibold 
            hover:bg-red-600 text-sm sm:text-base whitespace-nowrap
            disabled:opacity-50 disabled:cursor-not-allowed 
            transition-colors active:scale-95"
          onClick={handleGptSearchClick}
          disabled={loading}
        >
          {loading ? "Searching..." : lang[langKey].search}
        </button>
      </form>
      {error && (
        <p className="text-red-400 mt-3 text-xs sm:text-sm font-medium 
          bg-black/70 px-4 py-2 rounded max-w-[90%] text-center">
          {error}
        </p>
      )}
    </div>
  );
};
export default GptSearchBar;