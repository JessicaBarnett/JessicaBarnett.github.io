import "./App.css";
// import { RouterProvider, createBrowserRouter } from "react-router";
import { useLayoutEffect, useRef, useState } from "react";

// Nav
// import ProjectPage from "@src/pages/Project-Page";
import HomePage from "@src/pages/Home-Page";
import Navigation from "@src/components/Navigation.tsx";
import Drawer from "./components/Drawer";
import ProjectPage from "./pages/Project-Page";
import { ProjectT } from "./types/data-types";

// const router = createBrowserRouter([
//     {
//       path: '/',
//       element: <HomePage />,
//     },
//     {
//       path: 'projects/:project_id',
//       element: <ProjectPage />,
//       loader: () => {console.log('project loader')}
//     }
// ]);

function App() {
  const fixedNavRef = useRef<HTMLDivElement | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectT | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // TODO: Really this should be managed by react-router, but I've yet to figure out
  // how to get this specific transition I want to work with the viewTransitions api.
  const handleNavigateToProject = (project: ProjectT) => {
    setSelectedProject(project);
    setDetailOpen(true);
  }

  return (
    <>
        <div ref={fixedNavRef}>
          <Navigation></Navigation>
        </div>
        <div className="background" id="main">
          <div className="page-frame" id="page-frame">
            <HomePage onNavigateToProject={handleNavigateToProject}></HomePage>
            <Drawer isOpen={detailOpen} onClose={() => setDetailOpen(false)}>
              <ProjectPage project={selectedProject}></ProjectPage>
            </Drawer>
          </div>
        </div>
    </>
  );
}

export default App;
