import { useSelector } from "react-redux";
import MovieList from "./MovieList";



const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies.nowPlayingMovies && (
      <div className =" bg-black">
        <div className="  mt-0 md:-mt-60 pl-4 md:pl-12 relative z-20">
            <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
            <MovieList title={"Popular"} movies={movies.nowPopularMovies}/>
            <MovieList title={"Top Rated"} movies={movies.nowTopRatedMovies}/>
            <MovieList title={"Upcoming Movies"} movies={movies.UpcomingMovies}/>
            <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
            <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>

      {/*
      MovieList - Popular
      MovieLIst -NowPlaying
      Movielist -Trending
      MovieList - Horror
      
      */ }
      </div>
      
    </div>

  )

  );

};

export default SecondaryContainer
