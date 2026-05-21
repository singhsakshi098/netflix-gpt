import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BACKGROUND_IMAGE } from "../utils/constants";

const GptSearch = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${BACKGROUND_IMAGE})` }}
    >
      {/* Dark overlay for readability */}
      <div className="min-h-screen" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <div className="pt-14 sm:pt-20 pb-8">
          <GptSearchBar />
          <GptMovieSuggestions />
        </div>
      </div>
    </div>
  );
};

export default GptSearch;