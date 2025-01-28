import "./App.css";
import { useRef, useState } from "react";

// Nav
import HomePage from "@src/pages/Home-Page";
import Navigation from "@src/components/Navigation.tsx";
import Drawer from "./components/Drawer";
import ProjectPage from "./pages/Project-Page";
import { ProjectDetailsT, ProjectT } from "./types/data-types";
import Dialog from "./components/Dialog";


function App() {
  const fixedNavRef = useRef<HTMLDivElement | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectDetailsT | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const hasProjectDetails = (project: ProjectDetailsT | ProjectT | null) => {
      if (
          project &&
          'title' in project &&
          'role' in project &&
          'time' in project &&
          'type' in project &&
          'media' in project &&
          'content' in project &&
          'table' in project &&
          project.media.length > 1 &&
          project.content.length > 1 &&
          project.table.length > 1
      ) {
          return true;
      } else {
          return false;
      }
  }

  // TODO: Really this should be managed by react-router, but I've yet to figure out
  // how to get this specific transition I want to work with the viewTransitions api.
  const handleNavigateToProject = (project: ProjectT | ProjectDetailsT) => {
    if (hasProjectDetails(project)) {
      setSelectedProject(project as ProjectDetailsT);
      setDetailOpen(true);
    }
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
