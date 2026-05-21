import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  useMovieTrailer(movieId);
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  return (
    <>
      {/* Iframe container */}
      <div style={{
        position: "absolute",
        top: 0, left: 0,
        width: "100%", height: "100%",
        overflow: "hidden",
        zIndex: 0,
      }}>
        <iframe
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "calc(100vh * 16 / 9 * 1.3)",
            height: "calc(100vw * 9 / 16 * 1.3)",
            minWidth: "130%",
            minHeight: "130%",
            transform: "translate(-50%, -50%)",
            border: "none",
            pointerEvents: "none",
          }}
          src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&loop=1&playlist=${trailerVideo?.key}&controls=0&disablekb=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&fs=0`}
          title="movie trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>

      {/* Blocker — prevents clicking on iframe */}
      <div style={{
        position: "absolute",
        top: 0, left: 0,
        width: "100%", height: "100%",
        zIndex: 5,
        background: "transparent",
        pointerEvents: "all",
      }} />
    </>
  );
};

export default VideoBackground;
