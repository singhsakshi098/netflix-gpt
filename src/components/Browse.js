import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";


const Browse = () => {
  useNowPlayingMovies();

  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
     {/*/ 
        Main Container
         -Video Background
         -videoTitle
        SecondaryContainer
         -MovieList * n
         -Cards * n
     
     */}

    </div>
  )
}

export default Browse;