// import { useEffect } from "react";
import "./App.css";
import { useFilters } from "./hooks/useFilters";
import { useProjects } from "./hooks/useProjects";
import { useExperienceEntries} from "./hooks/useExperienceEntries";
import { useSelectedFilter } from "./hooks/useSelectedFilter";
import { useFilteredProjects } from "./hooks/useFilteredProjects";

import ProjectList from "./components/ProjectList";
import ExperienceEntry from "./components/ExperienceEntry";
import ContactForm from "./components/ContactForm";

function App() {
  const [filters] = useFilters();
  const [projects] = useProjects();
  const [expEntries] = useExperienceEntries();
  const [selectedFilter, setSelectedFilter] = useSelectedFilter(filters);
  const [filteredProjects] = useFilteredProjects(projects, filters, selectedFilter);

  // turn this back on after I fix the scroll position weirdness
  const onTagSelect = (name: string) => {
    // setSelectedFilter(name);
  }

  return (
    <>
      <canvas id="canvas"></canvas>
      <div className="page">
        <section className="section-title triangle-left rainbow-right-2">
          <div className="section-content indent-64 ">
            <h1 className="title-1">
              <span className="outdent-1">Jessica </span>
              Barnett
            </h1>
            <h2 className="indent-2 subtitle-1">
              <span className="outdent-1">Front-End / FullStack </span>
              <span className="nowrap">Software Engineer</span>
            </h2>
          </div>
        </section>

        <section className="section-about trapezoid-right rainbow-top">
          <div className="section-content">
            <div className="indent-2">
              <p className="deco-font-1">
                <em className="outdent-1">Hello.</em>
              </p>
              <p className="deco-font-2 ">
                My name is Jessica{" "}
                <span className="nowrap">and I make web things.</span>
              </p>
              <p className="indent-1 deco-font-3">Thanks for dropping by!</p>
            </div>
          </div>
        </section>

        <section className="section-projects rainbow-left-right-top">
          <div className="section-content grid-at-small">
            <h3 className="section-heading title-2 half">Projects</h3>

            <div className="filter-group half">
              <label htmlFor="filterProjects">Filter</label>
              <select
                name="filterProjects"
                id="filterProjects"
                value={selectedFilter?.name ?? undefined}
                onChange={(e) => (
                  setSelectedFilter(e.target.value)
                )}>
                <option value="">All</option>
                { filters.map(filter => (
                  <option value={filter.name} data-tags={filter.tags}>{filter.displayName}</option>
                ))}
              </select>
            </div>

            <ProjectList
              heading="Relay Network"
              projects={filteredProjects['Relay Network'] ?? []}
              selectedTags={selectedFilter?.tags ?? []}
              onTagSelect={onTagSelect}></ProjectList>


            <ProjectList
              heading="Weblinc Ecommerce"
              projects={filteredProjects['Weblinc Ecommerce'] ?? []}
              selectedTags={selectedFilter?.tags ?? []}
              onTagSelect={onTagSelect}></ProjectList>

          </div>
        </section>

        <section className="section-resume trapezoid-hug">
          <div className="section-content">
            <h3 className="section-heading title-2">Resume</h3>

            <div className="rainbow-left-2">
              <ol>
                { expEntries.map(entry => (
                    <ExperienceEntry entry={entry}></ExperienceEntry>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="section-contact color-bar">
          <div className="section-content grid ">
            <h3 className="section-heading title-2">Contact</h3>

            <ContactForm></ContactForm>

            <div className="sidebar-right one-third">
              <p className="made-with-love">
                Made with{" "}
                <img
                  className="icon-sm"
                  alt="love"
                  src="/assets/icons/love-icon-dark.png"
                ></img>{" "}
                in Philadelphia{" "}
              </p>

              <a className="social-link" href="#">
                <img
                  className="icon-lg"
                  alt="Linkedin Icon"
                  src="/assets/icons/linkedin-icon-dark.png"
                ></img>
                <span>LinkedIn</span>
              </a>

              <a className="social-link" href="#">
                <img
                  className="icon-lg"
                  alt="Github Icon"
                  src="/assets/icons/github-icon-dark.png"
                ></img>
                <span>Github</span>
              </a>
            </div>
          </div>
        </section>

        <section className="section-footer">
          <div className="section-content">
            <table className="page-stats-table">
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
            </table>

            <a className="page-stats-button" href="#">
              <button className="btn-2" type="button">
                Source
              </button>
            </a>
            <p className="page-stats-text">
              Project built with Sass, React, and Vite.
            </p>
          </div>
        </section>
      </div>{" "}
      {/* end page */}
    </>
  );
}

export default App;
