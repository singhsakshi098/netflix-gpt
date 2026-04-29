import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  useMovieTrailer(movieId);

  const videoKey = trailerVideo?.key;
  if (!videoKey) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <iframe
        className="absolute"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "120vw",
          height: "67.5vw",
          border: "none",
          pointerEvents: "none",
        }}
        src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoKey}&playsinline=1`}
        allow="autoplay; encrypted-media"
      />
      
      {/* 🎬 ONLY ONE CLEAN GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

    </div>
  );
};

export default VideoBackground;