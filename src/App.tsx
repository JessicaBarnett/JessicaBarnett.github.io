import "./App.css";
import { BrowserRouter, Route } from "react-router";
import HomePage from "./pages/Home-Page";
import ProjectPage from "./pages/Project-Page";
import { Routes } from "react-router";


function App() {

  return (
    <>
        <BrowserRouter>
          <div className="background">
          <Routes>
            <Route index element={<HomePage></HomePage>} />
            <Route path="/projects">
              <Route path=":project-id" element={<ProjectPage></ProjectPage>} />
            </Route>
          </Routes>
          </div>
        </BrowserRouter>
    </>
  );
}

export default App;
