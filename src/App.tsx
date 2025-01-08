import "./App.css";

import { useLayoutEffect, useRef, useState } from "react";

// Hooks
import { useFilters } from "@src/hooks/static/useFilters.ts";
import { useProjects } from "@src/hooks/static/useProjects.ts";
import { useExperienceEntries } from "@src/hooks/static/useExperienceEntries.ts";
import { useSelectedFilter } from "@src/hooks/useSelectedFilter.ts";
import { useFilteredProjects } from "@src/hooks/useFilteredProjects.ts";
import { useBgLines } from "@src/hooks/useBgLines.ts";
// import { useScrollPin } from "@src/hooks/useScrollPin.ts";


// Nav
import Navigation from "@src/components/Navigation.tsx";

// Title sections
import AboutSection from "@src/components/AboutSection.tsx";
import TitleSection from "@src/components/TitleSection.tsx";

// Projects
import FilterSelect from "@src/components/FilterSelect.tsx";
import Project from "./components/Project.tsx";

// Experience
import ExperienceEntry from "./components/ExperienceEntry.tsx";

// Contact
import ContactForm, { FormEventT } from "@src/components/ContactForm.tsx";
import SocialSidebar from "@src/components/SocialSidebar.tsx";
import { TagT } from "./types/data-types.ts";
import SectionHeading from "./components/SectionHeading.tsx";
import React from "react";

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

  type TagScrollEventT = {
    target: React.MutableRefObject<HTMLButtonElement | null>,
    viewportOffset: number,
    distFromTop: number
  }
    const [tagScrollEvent, setTagScrollEvent] = useState<TagScrollEventT | null>();

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

  // useScrollPin()

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
  };

  const handleFormStateChange = (formEvent:FormEventT) => {
    setFormState(formEvent)
  };

  const handleTagSelect = (tag: TagT, e: React.MouseEvent) => {
      // setTagScrollEvent({
      //   target: useRef(e.currentTarget),
      //   viewportOffset: e.currentTarget.getBoundingClientRect().y,
      //   distFromTop: e.currentTarget.getBoundingClientRect().top
      // });
      setSelectedFilter(tag);
  };

/* problem now is probably that react DOES remove and re-add elements, so my refs again might get lost */
// this means I need to react-ify this, and use a ref instead

  // useLayoutEffect(() => {
  //     setTimeout(() => {
  //       // issue is that I've lost the link to the live button for some reason?
  //       if (tagScrollEvent === null || tagScrollEvent === undefined) {
  //         setTagScrollEvent(null)
  //         return;
  //       }
  //       const { distFromTop, target, viewportOffset } = tagScrollEvent;
  //       const newDistFromTop = target?.getBoundingClientRect().top || 0;
  //       const newScrollPos = Math.abs(distFromTop - newDistFromTop) + viewportOffset;
  //       console.log(`difference: ${distFromTop - newDistFromTop} | newDistFromTop: ${newDistFromTop}`)
  //       // window.scrollTo({ top: newScrollPos, behavior: "smooth" })
  //       setTagScrollEvent(null)

  //     }, 1);
  // }, [tagScrollEvent]);

  return (
    <div className="background">
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
          <SectionHeading className="half">Projects</SectionHeading>

            <FilterSelect
              filters={filters}
              selectedFilter={selectedFilter}
              onFilterChange={handleFilterChange}
            ></FilterSelect>

            { Object.keys(filteredProjects).map(companyName => (
              <React.Fragment key={companyName}>
                <h4 className="section-subheading subtitle-2">{companyName}</h4>
                <ul>
                  { filteredProjects[companyName].map(project => (
                    <Project
                      key={project.id}
                      project={project}
                      selectedTags={selectedFilter?.tags ?? []}
                      onTagSelect={handleTagSelect}
                    ></Project>
                  ))}
                </ul>
              </React.Fragment>
            ))}

          </div>
        </section>

        <section
          id="experience"
          ref={expRef}
          className="section-experience trapezoid-hug"
        >
          <div className="content content-experience">
            <SectionHeading>Experience</SectionHeading>
            <ol>
                {expEntries.map((entry) => (
                    <ExperienceEntry
                      key={entry.id}
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
            <SectionHeading>Contact</SectionHeading>

            <ContactForm onFormStateChange={handleFormStateChange}
            ></ContactForm>
            <SocialSidebar></SocialSidebar>
          </div>
        </section>

        <section ref={ftrRef} id="footer" className="section-footer">
          <div className="content content-footer">
            <p>Curious about this build?  <br/> Check out the <a className="link" href="https://github.com/JessicaBarnett/JessicaBarnett.github.io" target="_blank">source code</a> and <a className="link" href="/docs/index" target="_blank">storybook!</a></p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
