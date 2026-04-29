import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies) return null;

  const mainMovie = movies[0];
  const { id, title, overview } = mainMovie;

  return (
    <div className="relative h-screen">
  <VideoBackground movieId={id} />
  <VideoTitle title={title} overview={overview} />
</div>
  );
};

export default MainContainer;