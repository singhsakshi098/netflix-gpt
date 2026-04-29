import {  onAuthStateChanged, signOut } from "firebase/auth"; 
import { useEffect } from "react" ;
import { useDispatch ,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";   // ✅ important!
import { auth } from "../utils/firebase";
import { addUser , removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";





const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut =() =>{
    signOut(auth)
    .then(() => {})
    .catch((error) => {
  // An error happened.
  navigate("/error");
});

  };

// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const unsubscribe =  onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName , photoURL } = user;
        dispatch
        (addUser({
           uid:uid, 
           email:email, 
           displayName:displayName,
           photoURL:photoURL,
           })
      );
      navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    // unsubscribe when component unmounts
    return () => unsubscribe();

  }, []);

  const handleGptSearchClick = () => {
    //Toggle GPT Search

    dispatch(toggleGptSearchView());
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  }


  return (
      // Already absolute — just make sure bg is gradient not solid black
<div className="fixed top-0 left-0 w-full px-4 sm:px-8 md:px-16 py-3 
                bg-gradient-to-b from-black/80 to-transparent z-50 
                flex justify-between items-center">
      <img 
      className="w-28 sm:w-36 md:w-44" 
      src ={LOGO}
      alt ="logo"/>
      { user && 
      (<div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-end">
        {showGptSearch && (
          <select 
          className="p-2 m-2 bg-gray-900 text-white" onChange= {handleLanguageChange} > 
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.identifier} value={lang.identifier}> 
            {lang.name} 
            </option>
          ))}
          
        </select>
        )}
        <button className=" py-1 px-2 sm:py-2 sm:px-4 mx-1 sm:mx-4 my-2 bg-purple-800 text-white rounded-lg text-sm sm:text-base"
        onClick={handleGptSearchClick}
         > 
         {showGptSearch? "HomePage" : "GptSearch"}
          </button>
        <img 
        className =" w-12 h-12"
        alt ="usericon"
        src = {user.photoURL}  />

       <button 
  onClick={handleSignOut} 
  className="font-bold text-white text-sm sm:text-base whitespace-nowrap"
>
  Sign Out
</button>
      </div>)}
    </div>
  )
}

export default Header