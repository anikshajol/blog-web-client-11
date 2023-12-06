import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./Layouts/Main.jsx";
import ErrorPage from "./ErrorPage/ErrorPage.jsx";
import Home from "./Pages/HomePage/Home/Home.jsx";
import AddBlog from "./Pages/AddBlog/AddBlog.jsx";
import AllBlogs from "./Pages/AllBlogs/AllBlogs.jsx";
import FeaturedBlogs from "./Pages/FeaturedBlogs/FeaturedBlogs.jsx";
import Wishlist from "./Pages/Wishlist/Wishlist.jsx";
import Login from "./Authentication/Login.jsx";
import Register from "./Authentication/Register.jsx";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BlogDetails from "./Pages/BlogDetails/BlogDetails.jsx";
import UpdateBlogs from "./Pages/UpdateBlog/UpdateBlogs.jsx";
import { PhotoProvider } from "react-photo-view";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/add-blog",
        element: (
          <PrivateRoute>
            {" "}
            <AddBlog></AddBlog>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-blog",
        element: (
          <PrivateRoute>
            <AllBlogs></AllBlogs>
          </PrivateRoute>
        ),
      },
      {
        path: "/featured-blog",
        element: <FeaturedBlogs></FeaturedBlogs>,
      },
      {
        path: "/wishlist",
        element: <Wishlist></Wishlist>,
      },
      {
        path: "/blog-details/:id",
        element: (
          <PrivateRoute>
            <BlogDetails></BlogDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/blogs/${params.id}`),
      },
      {
        path: "/update/:id",
        element: (
          <PrivateRoute>
            <UpdateBlogs></UpdateBlogs>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/blogs/${params.id}`),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PhotoProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={routes}></RouterProvider>
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </PhotoProvider>
  </React.StrictMode>
);
