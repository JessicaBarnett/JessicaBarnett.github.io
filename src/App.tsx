import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router";
import { useRef } from "react";

// Nav
import ProjectPage from "@src/pages/Project-Page";
import HomePage from "@src/pages/Home-Page";
import Navigation from "@src/components/Navigation.tsx";

const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: 'projects/:project_id',
      element: <ProjectPage />,
    }
]);

function App() {
  const fixedNavRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
        <div ref={fixedNavRef}>
          <Navigation></Navigation>
        </div>
        <div className="background">
          <div className="page-frame">
            <RouterProvider router={router} />
            </div>
          </div>
    </>
  );
}

export default App;
