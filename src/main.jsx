import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import HomePage from './pages/HomePage.jsx';
import AdjustmentsPerfected from './pages/adjustments-perfected.jsx';
import ExportPageEnhanced from './pages/export-page-enhanced.jsx';
import ExportPageFinalVersion from './pages/export-page-final-version.jsx';
import ExportPageFinal from './pages/export-page-final.jsx';
import ExportPageMockup from './pages/export-page-mockup.jsx';
import ExportPageWithFileMenu from './pages/export-page-with-file-menu.jsx';
import ExportPageReference from './pages/ExportPageReference.jsx';
import EzTimelapseEntryPoint from './pages/EzTimelapseEntryPoint.jsx';
import EzTimelapseEntryPointDark from './pages/EzTimelapseEntryPointDark.jsx';
import ReviewPageEnhancedTimeline from './pages/review-page-enhanced-timeline.jsx';
import ReviewPageDark from './pages/ReviewPageDark.jsx';
import ReviewPageLight from './pages/ReviewPageLight.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>
  },
  {
    path: "/adjustments-perfected",
    element: <AdjustmentsPerfected/>
  },
  {
    path: "/export-enhanced",
    element: <ExportPageEnhanced/>
  },
  {
    path: "/export-final-version",
    element: <ExportPageFinalVersion/>
  },
  {
    path: "/export-final",
    element: <ExportPageFinal/>
  },
  {
    path: "/export-mockup",
    element: <ExportPageMockup/>
  },
  {
    path: "/export-with-file-menu",
    element: <ExportPageWithFileMenu/>
  },
  {
    path: "/export-reference",
    element: <ExportPageReference/>
  },
  {
    path: "/ez-timelapse",
    element: <EzTimelapseEntryPoint/>
  },
  {
    path: "/ez-timelapse-dark",
    element: <EzTimelapseEntryPointDark/>
  },
  {
    path: "/review-enhanced-timeline",
    element: <ReviewPageEnhancedTimeline/>
  },
  {
    path: "/review-dark",
    element: <ReviewPageDark/>
  },
  {
    path: "/review-light",
    element: <ReviewPageLight/>
  },
]);

const root = document.getElementById("root");
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
