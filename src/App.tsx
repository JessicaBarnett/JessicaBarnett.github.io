import "./App.css";
import { Routes, BrowserRouter, Route } from "react-router";
import { useRef } from "react";

// Nav
import ProjectPage from "@src/pages/Project-Page";
import HomePage from "@src/pages/Home-Page";
import Navigation from "@src/components/Navigation.tsx";


function App() {
  const fixedNavRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
        <BrowserRouter>
          <div ref={fixedNavRef}>
            <Navigation></Navigation>
          </div>

          <div className="background">
            <div className="page-frame">
              <Routes>
                <Route index element={<HomePage></HomePage>} />
                <Route path="/projects">
                  <Route path=":project-id" element={<ProjectPage></ProjectPage>} />
                </Route>
              </Routes>
            </div>
          </div>
        </BrowserRouter>
    </>
  );
}

export default App;
