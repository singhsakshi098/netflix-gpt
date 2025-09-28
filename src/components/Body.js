import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";   // ✅ FIXED
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName , photoURL } = user;
        dispatch(addUser({
           uid:uid, 
           email:email, 
           displayName:displayName,
           photoURL:photoURL,
           })
      );
      } else {
        dispatch(removeUser());
      }
    });

    return () => unsubscribe(); // ✅ clean up listener
  }, [dispatch]);

  return <RouterProvider router={appRouter} />;  // ✅ use RouterProvider
};

export default Body;
