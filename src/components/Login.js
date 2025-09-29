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
    <div>
      <Header />
      <div className="absolute">
        <img
          src={BACKGROUND_IMAGE}
          alt="background"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            type="text"
            ref={fullName}
            placeholder="Full Name"
            className="p-2 my-4 w-full bg-gray-700 rounded-md"
          />
        )}

        <input
          type="email"
          ref={email}
          placeholder="Email Address"
          className="p-2 my-4 w-full bg-gray-700 rounded-md"
        />
        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="p-2 my-4 w-full bg-gray-700 rounded-md"
        />

        {errorMessage && (
          <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        )}

        <button
          className="p-4 my-4 bg-red-700 w-full rounded-lg"
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
