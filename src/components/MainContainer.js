import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies || movies.length === 0) return null;

  const { id, title, overview } = movies[0];

  return (
    <div
      className="relative w-full"
      style={{ height: "100vh", minHeight: "500px", overflow: "hidden" }}
    >
      <VideoBackground movieId={id} />

      {/* Left vignette — subtle, not heavy */}
      <div className="absolute inset-0 z-20" style={{
        background: "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 35%, transparent 60%)"
      }} />

      {/* Bottom fade — clean Netflix style, fades to page bg */}
      <div className="absolute bottom-0 left-0 right-0 z-20" style={{
        height: "25%",
        background: "linear-gradient(to bottom, transparent 0%, #141414 100%)"
      }} />

      <VideoTitle title={title} overview={overview} />
    </div>
  );
};

export default MainContainer;
