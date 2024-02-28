import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import About from "./pages/About"
import Discover from "./pages/Discover"
import ErrorPage from "./pages/Error"
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Discover />, 
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <About />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
