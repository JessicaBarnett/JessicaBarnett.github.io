import "./App.css";

// import { useLayoutEffect, useEffect, useRef } from "react";
import { useRef } from "react";

import { useFilters } from "./hooks/useFilters";
import { useProjects } from "./hooks/useProjects";
import { useExperienceEntries } from "./hooks/useExperienceEntries";
import { useSelectedFilter } from "./hooks/useSelectedFilter";
import { useFilteredProjects } from "./hooks/useFilteredProjects";
// import { useScrollPosition } from "./hooks/useScrollPosition";

import { useBgLines } from "./hooks/useBgLines";

import ProjectList from "./components/ProjectList";
import ExperienceEntry from "./components/ExperienceEntry";
import ContactForm from "./components/ContactForm";

import { PlayIcon } from "./icons/PlayIcon";
import { PauseIcon } from "./icons/PauseIcon";
import { StopIcon } from "./icons/StopIcon";
import { LinkedinIcon } from "./icons/LinkedinIcon";
import { GithubIcon } from "./icons/GithubIcon";


function App() {
  const [filters] = useFilters();
  const [projects] = useProjects();
  const [expEntries] = useExperienceEntries();
  const [selectedFilter, setSelectedFilter] = useSelectedFilter(filters);
  const [filteredProjects] = useFilteredProjects(projects, filters, selectedFilter);
  // const [scrollPosition] = useScrollPosition();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pageRef = useRef<HTMLDivElement | null>(null);
  const ttlRef = useRef<HTMLElement | null>(null);
  const abtRef = useRef<HTMLElement | null>(null);
  const projRef = useRef<HTMLElement | null>(null);
  const expRef = useRef<HTMLElement | null>(null);
  const contRef = useRef<HTMLElement | null>(null);
  const ftrRef = useRef<HTMLElement | null>(null);
  const fixedNavRef = useRef<HTMLDivElement | null>(null);

  useBgLines({
    canvasRef,
    pageRef,
    ttlRef,
    abtRef,
    projRef,
    expRef,
    contRef,
    ftrRef
  }, filteredProjects);


  // useEffect(() => {
  //   const ttlHeight = +(ttlRef!.current!.offsetHeight ?? 0);
  //   const abtHeight = +(abtRef!.current!.offsetHeight ?? 0);
  //   const waypoint = ttlHeight + (abtHeight / 2);

  //   if (!scrollPosition.current) {
  //     console.log('no current scroll pos')
  //     return;
  //   }
  //   const isBelowNavWaypoint = scrollPosition.current > waypoint;
  //   const navIsHidden = fixedNavRef.current?.classList.contains('hidden');

  //   if (isBelowNavWaypoint && navIsHidden) {
  //     fixedNavRef.current?.classList.remove('hidden');
  //     return;
  //   }

  //   if (!isBelowNavWaypoint && !navIsHidden) {
  //     fixedNavRef.current?.classList.add('hidden');
  //   }
  // }, [scrollPosition, ttlRef, abtRef])

  // turn this back on after I fix the scroll position weirdness
  const onTagSelect = (/*name: string*/) => {
    console.log('tag select - to do')
    // setSelectedFilter(name);
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
  }

  return (
    <>
      <div ref={fixedNavRef} className="nav-links nav-links-fixed">
        <a className="nav-link" href="#projects">
          <PlayIcon></PlayIcon>
          <span>projects</span>
        </a>
        <a className="nav-link" href="#experience">
          <PauseIcon></PauseIcon>
          <span>experience</span>
        </a>
        <a className="nav-link" href="#contact">
          <StopIcon></StopIcon>
          <span>contact</span>
        </a>
      </div>

      <div className="layout">
        <div ref={pageRef} className="page">
          <canvas id="canvas" ref={canvasRef} height="100%" width="100%"></canvas>
          <section ref={ttlRef} className="section-title triangle-left">
            <div className="section-content">
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

          <section id="about" ref={abtRef} className="section-about trapezoid-right">
            <div className="section-content">
              <div className="indent-2">
                <p className="deco-font-1">
                  <em className="outdent-1">Hello.</em>
                </p>
                <p className="deco-font-2 ">
                  My name is Jessica{" "}
                  <span className="nowrap">and I make web things.</span>
                </p>
                <nav className="nav-links nav-links-inline">
                  <a className="nav-link" href="#projects">
                    <PlayIcon></PlayIcon>
                    <span>projects</span>
                  </a>
                  <a className="nav-link" href="#experience">
                    <PauseIcon></PauseIcon>
                    <span>experience</span>
                  </a>
                  <a className="nav-link" href="#contact">
                    <StopIcon></StopIcon>
                    <span>contact</span>
                  </a>
                </nav>
              </div>
            </div>
          </section>

          <section id="projects" ref={projRef} className="section-projects">
            <div className="section-content grid-at-small">
              <h3 className="section-heading title-2 half">Projects</h3>

              <div className="filter-projects-group half">
                <label className="filter-projects-label" htmlFor="filterProjects">Filter</label>
                <select
                  className="filter-projects-select"
                  name="filterProjects"
                  id="filterProjects"
                  value={selectedFilter?.name ?? undefined}
                  onChange={handleFilterChange}>
                  <option value="">All</option>
                  {filters.map(filter => (
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

          <section  id="experience" ref={expRef} className="section-experience trapezoid-hug">
            <div className="section-content">
              <h3 className="section-heading title-2">Experience</h3>
              <ol>
                {expEntries.map(entry => (
                  <ExperienceEntry entry={entry}></ExperienceEntry>
                ))}
              </ol>
            </div>
          </section>

          <section id="contact" ref={contRef} className="section-contact color-bar">
            <div className="section-content grid-at-med">
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

                <a className="social-link" target="_blank" href="https://www.linkedin.com/in/jessica-m-barnett/">
                  <LinkedinIcon></LinkedinIcon>
                  <span className="social-link-text">LinkedIn</span>
                </a>

                <a className="social-link" target="_blank" href="https://github.com/JessicaBarnett">
                  <GithubIcon></GithubIcon>
                  <span className="social-link-text">Github</span>
                </a>
              </div>
            </div>
          </section>

          <section ref={ftrRef} className="section-footer">
            <div className="section-content">
              {/* Put like, "interested in this build?  see the style guide, or my write up about it!" in this section too  */}
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
      {/* end page */}
    </>
  );
}

export default App;
