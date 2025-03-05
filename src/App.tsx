import "./App.css";
import { useRef, useState } from "react";

// Nav
import HomePage from "@src/pages/Home-Page";
import Navigation from "@src/components/Navigation.tsx";
import ProjectPage from "./pages/Project-Page";
import { ProjectDetailsT, ProjectT, projectHasDetails } from "@src/types/data-types";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  const fixedNavRef = useRef<HTMLDivElement | null>(null);
  const [transitionState, setTransitionState] = useState<'in'|'out'|'idle'>('idle')

  // TODO: Really this should be managed by react-router, but I've yet to figure out
  // how to get this specific transition I want to work with the viewTransitions api.
  const handleNavigateToProject = (project: ProjectT | ProjectDetailsT) => {
    if (projectHasDetails(project)) {
      setTransitionState('in');
    }
  }

  return (
    <>
      <BrowserRouter>
        <div ref={fixedNavRef}>
          <Navigation></Navigation>
        </div>
        <div className={`block-transition transition-${transitionState}`}></div>
        <div className="background" id="main">
          <div className="page-frame" id="page-frame">
              <Routes>
                <Route index element={
                  <HomePage onNavigateToProject={handleNavigateToProject}></HomePage>
                } />
                <Route path="project">
                  <Route path=":projectSlug" element={<ProjectPage></ProjectPage>} />
                </Route>
              </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
