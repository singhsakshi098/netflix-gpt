import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";


const Body = () => {


  const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
   {
    path: "/login",    // ✅ Alias for login
    element: <Login />,
  },

  {
    path: "/browse",
    element: <Browse />,
  },
]);

 
  return(
  <div>
    <RouterProvider router={appRouter} />
    </div> 
    );  // ✅ use RouterProvider
};

export default Body;