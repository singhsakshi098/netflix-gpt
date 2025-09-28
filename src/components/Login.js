import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);

  const handleButtonClick = () => {
    // validate email + password
    const message = checkValidData(
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // 🔹 Sign Up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;

          // update profile with displayName + photo
          updateProfile(user, {
            displayName: fullName.current?.value || "",
            photoURL: "https://avatars.githubusercontent.com/u/215795693?v=4",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = user;
              dispatch
              (addUser
                ({ 
                  uid :uid,
                  email :email,
                  displayName:displayName, 
                  photoURL : photoURL,
                })
              );
              console.log("✅ Profile updated");
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });

          console.log("✅ Signed up:", user);
          setErrorMessage(null);
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            setErrorMessage("Email already registered. Please Sign In.");
          } else {
            setErrorMessage(error.message);
          }
        });
    } else {
      // 🔹 Sign In
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const { uid, email, displayName, photoURL } = userCredential.user;
          dispatch(addUser({ uid, email, displayName, photoURL }));
          console.log("✅ Signed in:", userCredential.user);
          setErrorMessage(null);
          navigate("/browse");
        })
        .catch((error) => {
          if (error.code === "auth/invalid-credential") {
            setErrorMessage("Invalid email or password.");
          } else {
            setErrorMessage(error.message);
          }
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/c95abc7a-8124-4630-bb7a-3b160bdc6de3/web/IN-en-20250915-TRIFECTA-perspective_d3d87aa7-58ed-4c6b-98dc-231ed05ba675_small.jpg"
          alt="logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {/* Only show Full Name for Sign Up */}
        {!isSignInForm && (
          <input
            type="text"
            ref={fullName}
            placeholder="Full Name"
            className="p-2 my-4 w-full bg-gray-700"
          />
        )}

        <input
          type="text"
          ref={email}
          placeholder="Email Address"
          className="p-2 my-4 w-full bg-gray-700"
        />
        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="p-2 my-4 w-full bg-gray-700"
        />

        {/* Error Message */}
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>

        <button
          className="p-4 my-4 bg-red-700 w-full rounded-lg "
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
