import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="flex-shrink-0 w-28 sm:w-36 md:w-40 lg:w-44
      transition-transform duration-300 ease-out
      hover:scale-110 hover:z-10 relative">
      <img
        alt="Movie poster"
        src={IMG_CDN_URL + posterPath}
        className="w-full rounded object-cover shadow-lg
          hover:shadow-2xl hover:shadow-black/80 transition-shadow duration-300"
        style={{ aspectRatio: "2/3" }}
        loading="lazy"
      />
    </div>
  );
};
export default MovieCard;