import "./App.css";

import { useLayoutEffect, useEffect, useRef } from "react";

import { useFilters } from "./hooks/useFilters";
import { useProjects } from "./hooks/useProjects";
import { useExperienceEntries} from "./hooks/useExperienceEntries";
import { useSelectedFilter } from "./hooks/useSelectedFilter";
import { useFilteredProjects } from "./hooks/useFilteredProjects";

import { useBgLines } from "./hooks/useBgLines";

import ProjectList from "./components/ProjectList";
import ExperienceEntry from "./components/ExperienceEntry";
import ContactForm from "./components/ContactForm";

function App() {
  const [filters] = useFilters();
  const [projects] = useProjects();
  const [expEntries] = useExperienceEntries();
  const [selectedFilter, setSelectedFilter] = useSelectedFilter(filters);
  const [filteredProjects] = useFilteredProjects(projects, filters, selectedFilter);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pageRef = useRef<HTMLDivElement| null>(null);
  const ttlRef = useRef<HTMLElement | null>(null);
  const abtRef = useRef<HTMLElement | null>(null);
  const projRef = useRef<HTMLElement | null>(null);
  const expRef = useRef<HTMLElement | null>(null);
  const contRef = useRef<HTMLElement | null>(null);

  useBgLines({
    canvasRef,
    pageRef,
    ttlRef,
    abtRef,
    projRef,
    expRef,
    contRef,
  }, useFilteredProjects);

  // // const doCanvasStuff = (e: Event | null) => {
  // //    if (e) {
  // //     console.dir(e);
  // //    }

  // //   console.log('------ doing canvas stuff -------')
  // //   const ctx = canvasRef?.current?.getContext('2d');
  // //   const width = pageRef?.current?.clientWidth;
  // //   const height = pageRef?.current?.clientHeight;

  // //   if (!ctx || !height || !width ) {
  // //     console.log('no context/height/width!')
  // //     return;
  // //   }

  // //   canvasRef?.current?.setAttribute('height', `${height}px`);
  // //   canvasRef?.current?.setAttribute('width', `${width}px`);
  // //   ctx.clearRect(0, 0, height, width);

  // //   const ttlHeight = +(ttlRef!.current!.offsetHeight ?? 0);
  // //   const abtHeight = +(abtRef!.current!.offsetHeight ?? 0);
  // //   const projHeight = +(projRef!.current!.offsetHeight ?? 0);
  // //   const expHeight = +(expRef!.current!.offsetHeight ?? 0);

  // //   const path: [number, number][] = [
  // //     [(width - 100), 10],
  // //     [(width - 100), ttlHeight],
  // //     [10, ttlHeight],
  // //     [10, (ttlHeight + abtHeight + projHeight)],
  // //     [50, (ttlHeight + abtHeight + projHeight)],
  // //     [50, (ttlHeight + abtHeight + projHeight + expHeight)],
  // //     [width - 100, (ttlHeight + abtHeight + projHeight + expHeight)],
  // //     [width, (ttlHeight + abtHeight + projHeight + expHeight + 80)]
  // //   ];

  // //   ctx.beginPath()
  // //   path.forEach((point, idx) => {
  // //     if (idx === 0) {
  // //       ctx.moveTo(...point);
  // //     } else {
  // //       ctx.lineTo(...point);
  // //     }
  // //   });

  // //   ctx.lineWidth = 5;
  // //   ctx.strokeStyle = "#0084CE";
  // //   ctx.stroke();

  // // }

    // useLayoutEffect(() => {
    //   doCanvasStuff(null);
    //   window.addEventListener('resize', doCanvasStuff);

    //   return () => window.removeEventListener('resize', doCanvasStuff);
    // }, [filteredProjects]);

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
          <div className="bezel"></div>
        </section>

        <section ref={abtRef} className="section-about trapezoid-right">
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

        <section ref={projRef} className="section-projects rainbow-left-right-top">
          <div className="section-content grid-at-small">
            <h3 className="section-heading title-2 half">Projects</h3>

            <div className="filter-group half">
              <label htmlFor="filterProjects">Filter</label>
              <select
                name="filterProjects"
                id="filterProjects"
                value={selectedFilter?.name ?? undefined}
                onChange={handleFilterChange}>
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

        <section ref={expRef} className="section-resume trapezoid-hug">
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

        <section ref={contRef} className="section-contact color-bar">
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
      </div>
      {/* end page */}
    </>
  );
}

export default App;
