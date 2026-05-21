import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import {USER_AVATAR} from "../utils/constants";
import { BACKGROUND_IMAGE } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // 🔹 Sign Up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(() => {
          return updateProfile(auth.currentUser, {
            displayName: fullName.current?.value || "",
            photoURL: USER_AVATAR,
          });
        })
        .then(() => {
          const { uid, email, displayName, photoURL } = auth.currentUser;
          dispatch(addUser({ uid, email, displayName, photoURL }));
          console.log("✅ Signed up & profile updated:", auth.currentUser);
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
        })
        .catch((error) => {
          if (
            error.code === "auth/invalid-credential" ||
            error.code === "auth/wrong-password"
          ) {
            setErrorMessage("Invalid email or password.");
          } else if (error.code === "auth/user-not-found") {
            setErrorMessage("No account found. Please Sign Up.");
          } else {
            setErrorMessage(error.message);
          }
        });
    }
  };

  const toggleSignInForm = () => setIsSignInForm(!isSignInForm);

  return (
    <div className="relative min-h-screen">
      <Header />

      {/* Background image — full screen cover */}
      <div className="fixed inset-0 -z-10">
        <img
          src={BACKGROUND_IMAGE}
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form — responsive widths */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 
          absolute p-6 sm:p-8 md:p-12 bg-black 
          my-24 sm:my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-2xl sm:text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            type="text"
            ref={fullName}
            placeholder="Full Name"
            className="p-2 sm:p-3 my-3 sm:my-4 w-full bg-gray-700 rounded-md text-sm sm:text-base"
          />
        )}

        <input
          type="email"
          ref={email}
          placeholder="Email Address"
          className="p-2 sm:p-3 my-3 sm:my-4 w-full bg-gray-700 rounded-md text-sm sm:text-base"
        />
        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="p-2 sm:p-3 my-3 sm:my-4 w-full bg-gray-700 rounded-md text-sm sm:text-base"
        />

        {errorMessage && (
          <p className="text-red-500 font-bold text-sm sm:text-lg py-2">{errorMessage}</p>
        )}

        <button
          className="p-3 sm:p-4 my-4 bg-red-700 hover:bg-red-600 transition-colors w-full rounded-lg text-sm sm:text-base font-semibold"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="py-4 cursor-pointer text-sm sm:text-base hover:underline" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;