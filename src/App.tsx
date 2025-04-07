import "./App.css";
import { useRef, useState } from "react";

// Nav
import HomePage from "@src/pages/Home-Page";
import Navigation from "@src/components/Navigation.tsx";
import ProjectPage from "./pages/Project-Page";
import { FilterT, ProjectT, projectHasDetails } from "@src/types/data-types";
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { wait } from "./utils/util";
import { scrollToId, getIdFromClickEvt } from "./utils/nav-utils";


function App() {
  const [scrollPos, setScrollPos] = useState<number>(0);
  // so that selected filters will persist after a roundtrip to the project page
  const [storedFilter, setStoredFilter] = useState<FilterT|undefined|null>();
  const navigate = useNavigate();
  const fixedNavRef = useRef<HTMLDivElement | null>(null);
  const [transitionState, setTransitionState] = useState<'in'|'out'|'idle'>('idle');
  const location = useLocation();

  // *** TRANSITIONS *** //

  const startTransitionToMain = async () => {
    setTransitionState('out');
    await wait(200);
  }

  const startTransitionFromMain = async () => {
    setTransitionState('in');
    await wait(200);
  }

  const resetTransition = async () => {
    await wait(300);
    setTransitionState('idle');
  }

  const handleNavLinkCLick = async (e: React.MouseEvent) => {
    const id = getIdFromClickEvt(e);

    // if we're on the home page and this is an anchor link
    if (location.pathname === '/' && id) {
      scrollToId(id);
      return;
    }

    // if we're on the project page and this is an anchor link
    if (location.pathname !== '/' && id) {
      e.preventDefault();
      await startTransitionToMain();
      navigate(`/#${id}`);
      scrollToId(id);
      return;
    }
  }

  const handleGoToProject = async (e: React.MouseEvent, project: ProjectT, filter: FilterT | null | undefined) => {
    // make sure this project has a details page to go to first
    if (!projectHasDetails(project)) {   return; }

    if (filter) {
      setStoredFilter(filter);
    }

    setScrollPos( window.scrollY); // store scroll position for back action

    e.preventDefault()

    await startTransitionFromMain();
    navigate(`/project/${project.slug}`);
    await resetTransition();
  }

  const handleBackFromProject = async (e: React.MouseEvent) => {
    e.preventDefault();
    await startTransitionToMain();
    await navigate('/');
    await wait(10); // TODO: hack city.  need to do this in a layout effect, but since I have to do things WHILE the transition is happening
    window.scrollTo({ top: scrollPos, behavior: 'instant' });
    await resetTransition();
    setStoredFilter(null); // reset stored filter so that an old filter doesn't persist
  }

  return (
    <>
        <div ref={fixedNavRef}>
          <Navigation onNavigation={handleNavLinkCLick}/>
        </div>
        <div className="background" id="main">
          <div className="page-frame" id="page-frame">
              <div className={`block-transition transition-${transitionState}`}></div>
              <Routes>
                <Route
                  path='/'
                  element={<HomePage onNavigateToProject={handleGoToProject} initialFilter={storedFilter}></HomePage>}
                />
                <Route
                    path="/project/:projectSlug"
                    element={<ProjectPage onNavigateBack={handleBackFromProject}></ProjectPage>}
                />
              </Routes>
          </div>
        </div>
    </>
  );
}

export default App;