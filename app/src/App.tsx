// import { useEffect } from "react";
import "./App.css";
import ProjectList from "./components/ProjectList";
import { useFilters } from "./hooks/useFilters";
import { useProjects } from "./hooks/useProjects";
import { useSelectedFilter } from "./hooks/useSelectedFilter";
import { useFilteredProjects } from "./hooks/useFilteredProjects";

function App() {
  console.log('running app')
  const [filters] = useFilters();
  const [projects] = useProjects();
  const [selectedFilter, setSelectedFilter] = useSelectedFilter(filters);
  const [filteredProjects] = useFilteredProjects(projects, filters, selectedFilter);

  const onTagSelect = (name: string) => {
    console.log(`tag selected: ${name}`)
    setSelectedFilter(name);
  }


  return (
    <>
      <canvas id="canvas"></canvas>
      <div className="page">
        <section className="section-title triangle-left">
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

        <section className="section-about trapezoid-right indent-2">
          <div className="section-content indent-64">
            <p className="deco-font-1">
              <em className="outdent-1">Hello.</em>
            </p>
            <p className="deco-font-2 ">
              My name is Jessica{" "}
              <span className="nowrap">and I make web things.</span>
            </p>
            <p className="indent-1 deco-font-3">Thanks for dropping by!</p>
          </div>
        </section>

        <section className="section-projects">
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

            <ol>
              {/* Begin Experience Component */}
              <li className="entry">
                <div className="supertitle-3">
                  <time dateTime="2018">2020</time> -{" "}
                  <time dateTime="2238">2023</time>
                </div>
                <h4 className="title-3">Fullstack Software Engineer</h4>
                <p className="subtitle-3">Relay Network</p>
                <button className="btn-1" type="button">
                  Typescript
                </button>
                <button className="btn-1" type="button">
                  React
                </button>
                <button className="btn-1" type="button">
                  Angular
                </button>
                <button className="btn-1" type="button">
                  Node
                </button>
                <button className="btn-1" type="button">
                  AWS
                </button>
              </li>
              {/* End Experience Component */}

              {/* Begin Experience Component */}
              <li className="entry">
                <div className="supertitle-3">
                  <time dateTime="2018">2018</time> -{" "}
                  <time dateTime="2238">2020</time>
                </div>
                <h4 className="title-3">Front End Software Engineer</h4>
                <p className="subtitle-3">Relay Network</p>
                <button className="btn-1" type="button">
                  Typescript
                </button>
                <button className="btn-1" type="button">
                  Angular
                </button>
                <button className="btn-1" type="button">
                  CSS/SCSS
                </button>
                <button className="btn-1" type="button">
                  CraftCMS
                </button>
              </li>
              {/* End Experience Component */}

              {/* Begin Experience Component */}
              <li className="entry">
                <div className="supertitle-3">
                  <time dateTime="2018">2016</time> -{" "}
                  <time dateTime="2238">2018</time>
                </div>
                <h4 className="title-3">Lead Front End Developer</h4>
                <p className="subtitle-3">Weblinc Ecommerce</p>
                <button className="btn-1 filter-projects" type="button">
                  Javascript
                </button>
                <button className="btn-1 filter-projects" type="button">
                  JQuery
                </button>
                <button className="btn-1 filter-projects" type="button">
                  Ruby/Rails
                </button>
                <button className="btn-1 filter-projects" type="button">
                  HTML/Haml
                </button>
                <button className="btn-1 filter-projects" type="button">
                  CSS/SCSS
                </button>
              </li>
              {/* End Experience Component */}

              {/* Begin Experience Component */}
              <li className="entry">
                <div className="supertitle-3">
                  <time dateTime="2018">2016</time> -{" "}
                  <time dateTime="2238">2018</time>
                </div>
                <h4 className="title-3">Front End Developer</h4>
                <p className="subtitle-3">Weblinc Ecommerce</p>
                <button className="btn-1 filter-projects" type="button">
                  Javascript
                </button>
                <button className="btn-1 filter-projects" type="button">
                  JQuery
                </button>
                <button className="btn-1 filter-projects" type="button">
                  Ruby/Rails
                </button>
                <button className="btn-1 filter-projects" type="button">
                  HTML/Haml
                </button>
                <button className="btn-1 filter-projects" type="button">
                  CSS/SCSS
                </button>
              </li>
              {/* End Experience Component */}
            </ol>
          </div>
        </section>

        <section className="section-contact color-bar">
          <div className="section-content grid ">
            <h3 className="section-heading title-2">Contact</h3>

            {/* Begin ContactForm Component */}
            <form
              className="contact-form two-third"
              action="https://api.web3forms.com/submit"
              method="POST"
            >
              <input
                type="hidden"
                name="access_key"
                className="hidden"
                value="ACCESS_KEY"
              ></input>
              <input type="checkbox" name="botcheck" className="hidden"></input>

              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name"></input>

              <label htmlFor="email">Email</label>
              <input type="text" name="email" id="email"></input>

              <label htmlFor="subject">Subject</label>
              <input type="text" name="subject" id="subject"></input>

              <label htmlFor="message">Message</label>
              <textarea name="message" id="message"></textarea>

              <button className="btn-2" type="submit">
                Send
              </button>
            </form>
            {/* End ContactForm  Component */}

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
