import "./App.css";
import { useRef, useState } from "react";

// Nav
import HomePage from "@src/pages/Home-Page";
import Navigation from "@src/components/Navigation.tsx";
import ProjectPage from "./pages/Project-Page";
import { ProjectDetailsT, ProjectT, projectHasDetails } from "@src/types/data-types";
import { Route, Routes, useNavigate } from "react-router";
import { wait } from "./utils/util";

function App() {
  const [scrollPos, setScrollPos] = useState<number>(0);
  const navigate = useNavigate();
  const fixedNavRef = useRef<HTMLDivElement | null>(null);
  const [transitionState, setTransitionState] = useState<'in'|'out'|'idle'>('idle')

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
    await wait(400);
    setTransitionState('idle');
  }

  // ***  NAVIGATION UTILS *** //

  const getLinkElFromNavEvt = (e: React.MouseEvent): HTMLAnchorElement | null => {
      const target = e.target as HTMLSpanElement;
    if (target instanceof HTMLAnchorElement && target.tagName === "A") {
      return target; // if clickEvt happens on an a tag, target will be the link
    } else if (target.parentElement instanceof HTMLAnchorElement && target.parentElement.tagName === "A") {
      return target.parentElement; // if clickEvt happens on a navLink element, the target's parent will be the link
    } else {
      return null;
    }
  }

  const getNavLinkId = (anchorEl: EventTarget & HTMLElement): string | null => {
    const href = anchorEl.getAttribute('href') || '';
    const matchObj = href.match(/#(.*)/);
    return matchObj !== null ? matchObj[1] : null;
  }

  const scrollToId = (id: string) => {
    let scrollToElement = id ? document.getElementById(id) : null;
    if (scrollToElement !== null) {
        window.scrollTo({
            top: scrollToElement.offsetTop - 55,
            left: 0,
            behavior: 'smooth'
        });
    } else {
        setTimeout(() => {
            scrollToElement = document.getElementById(id);
            if (scrollToElement !== null) {
                window.scrollTo({
                    top: scrollToElement.offsetTop - 55,
                    left: 0,
                    behavior: 'smooth'
                });
            }
        }, 50)
    }
  }

  const storeCurrentScrollPosition = () => {
    const boundingRect = document.getElementById('home-page')?.getBoundingClientRect();
    if (!boundingRect) { return; }
    setScrollPos( Math.abs(boundingRect.y)); // store scroll position for back action
  }

  // *** NAVIGATION EVENTS *** //

  const handleNavigateToMain = async (e: React.MouseEvent) => {
    const linkEl = getLinkElFromNavEvt(e);
    const navLinkId = linkEl ? getNavLinkId(linkEl) : null;
    if (!navLinkId) {  return; }

    e.preventDefault();

    // only transition if you aren't already on the main page
    if (window.location.pathname !== "/") {
      await startTransitionToMain();
    }

    navigate('/');
    scrollToId(navLinkId);
    resetTransition();
  }

  const handleGoToProject = async (e: React.MouseEvent, project: ProjectT | ProjectDetailsT) => {
    // make sure this project has a details page to go to first
    if (!projectHasDetails(project)) {   return; }
    storeCurrentScrollPosition();

    e.preventDefault()

    await startTransitionFromMain();
    navigate(`/project/${project.slug}`);
    await resetTransition();
  }

  const handleBackFromProject = async (e: React.MouseEvent) => {
    e.preventDefault();
    await startTransitionToMain();
    await navigate('/');
    await wait(500) // it's a timing issue.  Need to ensure the main page is in place BEFORE scrolling.
    window.scrollTo({ top: scrollPos, behavior: 'smooth' });
    await resetTransition();
  }

  return (
    <>
        <div ref={fixedNavRef}>
          <Navigation onNavigation={handleNavigateToMain}/>
        </div>
        <div className="background" id="main">
          <div className="page-frame" id="page-frame">
              <div className={`block-transition transition-${transitionState}`}></div>
              <Routes>
                <Route index element={
                  <HomePage onNavigateToProject={handleGoToProject}></HomePage>
                } />
                <Route path="project">
                  <Route path=":projectSlug" element={
                    <ProjectPage onNavigateBack={handleBackFromProject}></ProjectPage>
                  } />
                </Route>
              </Routes>
          </div>
        </div>
    </>
  );
}

export default App;