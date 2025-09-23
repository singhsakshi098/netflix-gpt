import React from "react";
import { useNavigate } from "react-router-dom";   // ✅ important!
import { signOut } from "firebase/auth";   // ✅ add this
import { auth } from "../utils/firebase";

const Header = () => {
  const navigate = useNavigate();

  const handleSignOut =() =>{
    signOut(auth).then(() => {
      navigate("/");
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
  navigate("/error");
});

  }
  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between" >
      <img 
      className="w-44  "
      src ="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-08-26/consent/87b6a5c0-0104-4e96-a291-092c11350111/0198e689-25fa-7d64-bb49-0f7e75f898d2/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
      alt ="logo"
      />
      <div className= "flex" p-2>
        <img 
        className =" w-12 h-12"
        alt ="usericon"
        src = "https://pbs.twimg.com/media/DN1OYIFX0AAbOMe.jpg"
        
        />
        <button onClick={(handleSignOut)} className =" font-bold text-white">(Sign Out)</button>
      </div>
    </div>
  )
}

export default Header
