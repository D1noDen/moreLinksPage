import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import ReviewPageLight from './pages/ReviewPageLight.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <ReviewPageLight/>
  },
]);

const root = document.getElementById("root");
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
