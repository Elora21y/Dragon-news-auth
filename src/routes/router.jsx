import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import CategoryNews from "../pages/CategoryNews";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AuthLayout from "../layouts/AuthLayout";
import NewsDetails from "../pages/NewsDetails";
import PrivateRoute from "./PrivateRoute";
import Loading from "../components/Loading";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    hydrateFallbackElement : <Loading></Loading>,
    children: [
      {
        path: "",
        element: <Home></Home>,
      },
      {
        path: "/category/:id",
        element: <CategoryNews></CategoryNews>,
        loader: () => fetch("/news.json"),
        HydrateFallback : Loading
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout/>,
    children : [
      {
        path : '/auth/login',
        Component : Login
      },
      {
        path : '/auth/register',
        Component : Register
      }
    ]
  },
  {
    path: "/news-details/:id",
    element: <PrivateRoute> <NewsDetails/> </PrivateRoute>,
    loader : () => fetch("/news.json"),
    HydrateFallback : Loading
  },
  {
    path: "/*",
    element: <h2>Error404</h2>,
  },
]);

export default router;
