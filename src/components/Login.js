import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
        const [isSignInForm , setIsSignInForm] = useState(true);
    
const toggleSignInForm =() => {
    setIsSignInForm(!isSignInForm);
};
    return(
        <div>
          <Header />
        <div className="absolute">
          <img src ="https://assets.nflxext.com/ffe/siteui/vlv3/c95abc7a-8124-4630-bb7a-3b160bdc6de3/web/IN-en-20250915-TRIFECTA-perspective_d3d87aa7-58ed-4c6b-98dc-231ed05ba675_small.jpg"
          alt ="logo"
        />
    </div>
    <form className=" w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
      <h1 className="font-bold text-3xl py-4">
        {isSignInForm? "Sign In": "Sign Up"}
      </h1>
        <input 
        type ="text" 
        placeholder="Email Adress" 
        className="p-2 my-4 w-full bg-gray-700"
        />
        {!isSignInForm && (
        <input 
        type ="text" 
        placeholder="Full Name" 
        className="p-2 my-4 w-full bg-gray-700"
        />
  )}
        <input type ="password" 
        placeholder="Password" 
        className="p-2 my-4 w-full"
        />
        <button className="p-4 my-4 bg-red-700 w-full rounded-lg">
          {isSignInForm? "Sign In": "Sign Up"}
            </button>
        <p className="py-4 cursor-pointer"onClick={toggleSignInForm}> 
          {isSignInForm? "New to Netflix? Sign Up Now"
           : "Already registered? Sign IN Now"}
        </p>

    </form>

</div>
 );
}
export default Login;