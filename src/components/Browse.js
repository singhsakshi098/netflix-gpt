import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";

const Browse = () => {
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div className="w-full min-h-screen overflow-x-hidden" style={{ backgroundColor: "#141414" }}>
      {showGptSearch ? (
        <>
          <Header />
          <GptSearch />
        </>
      ) : (
        <div className="relative">
          {/* Header is INSIDE relative div so it overlays the video */}
          <Header />
          {/*
          Main Container
           -Video Background
           -videoTitle
          SecondaryContainer
           -MovieList * n
           -Cards * n
          */}
          <MainContainer />
          <SecondaryContainer />
        </div>
      )}
    </div>
  );
};

export default Browse;