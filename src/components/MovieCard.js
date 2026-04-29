import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="flex-shrink-0 w-28 sm:w-36 md:w-40 lg:w-44">
      <img
        alt="Movie Card"
        src={IMG_CDN_URL + posterPath}
        className="w-full rounded-md hover:scale-110 transition-transform duration-300 cursor-pointer"
        style={{ aspectRatio: "2/3", objectFit: "cover" }}
      />
    </div>
  );
};

export default MovieCard;