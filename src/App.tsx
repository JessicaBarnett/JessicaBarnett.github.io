import "./App.css";

import { useRef, useState } from "react";

// Hooks
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
import FilterSelect from "@src/components/FilterSelect.tsx";
import Project from "./components/Project.tsx";

// Experience
import ExperienceEntry from "./components/ExperienceEntry.tsx";

// Contact
import ContactForm, { FormEventT } from "@src/components/ContactForm.tsx";
import SocialSidebar from "@src/components/SocialSidebar.tsx";
import { TagT } from "./types/data-types.ts";

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

  const [formState, setFormState] = useState('pending'); // pending, error, submitted

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
    filteredProjects,
    formState
  );

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
  };

  const handleFormStateChange = (formEvent:FormEventT) => {
    setFormState(formEvent)
  };

  const handleTagSelect = (tag: TagT) => {
      setSelectedFilter(tag);
  };

  return (
    <>
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

              { Object.keys(filteredProjects).map(companyName => (
                <>
                  <h4 className="section-subheading subtitle-2">{companyName}</h4>
                  <ul>
                    { filteredProjects[companyName].map(project => (
                      <Project
                        project={project}
                        selectedTags={selectedFilter?.tags ?? []}
                        onTagSelect={handleTagSelect}
                      ></Project>
                    ))}
                  </ul>
                </>
              ))}

            </div>
          </section>

          <section
            id="experience"
            ref={expRef}
            className="section-experience trapezoid-hug"
          >
            <div className="content content-experience">
              <h3 className="title-2">Experience</h3>
              <ol>
                  {expEntries.map(entry => (
                      <ExperienceEntry
                        entry={entry}
                        selectedTags={selectedFilter?.tags ?? []}
                        onTagSelect={handleTagSelect}
                      ></ExperienceEntry>
                  ))}
              </ol>
            </div>
          </section>

          <section
            id="contact"
            ref={contRef}
            className="section-contact color-bar"
          >
            <div className="content content-contact grid-at-med">
              <h3 className="section-heading title-2">Contact</h3>
              <ContactForm onFormStateChange={handleFormStateChange}
              ></ContactForm>
              <SocialSidebar></SocialSidebar>
            </div>
          </section>

          <section ref={ftrRef} id="footer" className="section-footer">
            <div className="content content-footer">
              <p>Curious about this build?  <br/> Check out the <a className="link" href="https://github.com/JessicaBarnett/JessicaBarnett.github.io" target="_blank">source code</a> and <a className="link" href="/docs/index" target="_blank">storybook!</a></p>
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
    </>
  );
}

export default App;
