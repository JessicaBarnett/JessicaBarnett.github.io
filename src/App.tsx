import "./App.css";

import { useRef } from "react";

import { useFilters } from "@src/hooks/static/useFilters.ts";
import { useProjects } from "@src/hooks/static/useProjects.ts";
import { useExperienceEntries } from "@src/hooks/static/useExperienceEntries.ts";
import { useSelectedFilter } from "@src/hooks/useSelectedFilter.ts";
import { useFilteredProjects } from "@src/hooks/useFilteredProjects.ts";

import { useBgLines } from "@src/hooks/useBgLines.ts";

// Nav
import Navigation from "@src/components/Navigation.tsx";

// Title sections
import AboutSection from "@src/components/About.tsx";
import TitleSection from "@src/components/Title.tsx";

// Projects
import ProjectList from "@src/components/ProjectList.tsx";
import FilterSelect from "@src/components/FilterSelect.tsx";

// Experience
import ExperienceList from "@src/components/ExperienceList.tsx";

// Contact
import ContactForm from "@src/components/ContactForm.tsx";
import SocialSidebar from "@src/components/SocialSidebar.tsx";

function App() {
  const [filters] = useFilters();
  const [projects] = useProjects();
  const [expEntries] = useExperienceEntries();
  const [selectedFilter, setSelectedFilter] = useSelectedFilter(filters);
  const [filteredProjects] = useFilteredProjects(
    projects,
    filters,
    selectedFilter
  );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pageRef = useRef<HTMLDivElement | null>(null);
  const ttlRef = useRef<HTMLElement | null>(null);
  const abtRef = useRef<HTMLElement | null>(null);
  const projRef = useRef<HTMLElement | null>(null);
  const expRef = useRef<HTMLElement | null>(null);
  const contRef = useRef<HTMLElement | null>(null);
  const ftrRef = useRef<HTMLElement | null>(null);
  const fixedNavRef = useRef<HTMLDivElement | null>(null);

  useBgLines(
    {
      canvasRef,
      pageRef,
      ttlRef,
      abtRef,
      projRef,
      expRef,
      contRef,
      ftrRef,
    },
    filteredProjects
  );

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
  };

  // should be a Hook
  let colorTheme = "light";
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    colorTheme = "dark";
  }

  return (
    <>
      <div className={`background ${colorTheme}`}>
        <div ref={fixedNavRef}>
          <Navigation></Navigation>
        </div>

        <div ref={pageRef} className="page">
          <canvas
            id="canvas"
            ref={canvasRef}
            height="100%"
            width="100%"
          ></canvas>

          <section ref={ttlRef} className="section-title triangle-left">
            <TitleSection></TitleSection>
          </section>

          <section
            id="about"
            className="section-about trapezoid-right"
            ref={abtRef}
          >
            <AboutSection></AboutSection>
          </section>

          <section id="projects" className="section-projects" ref={projRef}>

            <div className="content content-projects grid-at-small">
              <h3 className="section-heading title-2 half">Projects</h3>

              <FilterSelect
                filters={filters}
                selectedFilter={selectedFilter}
                onFilterChange={handleFilterChange}
              ></FilterSelect>

              <ProjectList
                heading="Relay Network"
                projects={filteredProjects["Relay Network"] ?? []}
                selectedTags={selectedFilter?.tags ?? []}
              ></ProjectList>

              <ProjectList
                heading="Weblinc Ecommerce"
                projects={filteredProjects["Weblinc Ecommerce"] ?? []}
                selectedTags={selectedFilter?.tags ?? []}
              ></ProjectList>
            </div>

          </section>

          <section
            id="experience"
            ref={expRef}
            className="section-experience trapezoid-hug"
          >
            <div className="content content-experience">
              <h3 className="title-2">Experience</h3>
              <ExperienceList expEntries={expEntries}></ExperienceList>
            </div>
          </section>

          <section
            id="contact"
            ref={contRef}
            className="section-contact color-bar"
          >
            <div className="content content-contact grid-at-med">
              <h3 className="section-heading title-2">Contact</h3>
              <ContactForm /*onFormStateChange={handleFilterChange}*/
              ></ContactForm>
              <SocialSidebar></SocialSidebar>
            </div>
          </section>

          <section ref={ftrRef} id="footer" className="section-footer">
            <div className="content content-footer">
              {/* Put like, "interested in this build?  see the style guide, or my write up AboutSection it!" in this section too  */}
              {/* <table className="page-stats-table">
              <tbody>
                  <tr>
                  <th>Language</th>
                  <th>HTML</th>
                  <th>SCSS</th>
                  <th>JS</th>
                  </tr>
                  <tr>
                  <th>Percent</th>
                  <td>20%</td>
                  <td>40%</td>
                  <td>40%</td>
                  </tr>
                  <tr>
                  <th>Lines</th>
                  <td colSpan={3}>6000 lines</td>
                  </tr>
              </tbody>
              </table> */}

              {/* <a className="page-stats-button" href="#">
              <button className="btn-2" type="button">
                  Source
              </button>
              </a>
              <p className="page-stats-text">
              Project built with Sass, React, and Vite.
              </p> */}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default App;
