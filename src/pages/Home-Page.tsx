import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

// types
import { ProjectT, TagT } from "@src/types/data-types.ts";

// Hooks
import { useFilters } from "@src/hooks/static/useFilters.ts";
import { useProjects } from "@src/hooks/static/useProjects.ts";
import { useExperienceEntries } from "@src/hooks/static/useExperienceEntries.ts";
import { useSelectedFilter } from "@src/hooks/useSelectedFilter.ts";
import { useFilteredProjects } from "@src/hooks/useFilteredProjects.ts";
import { useHomePageLines } from "@src/hooks/useHomePageLines.ts";

// Title sections
import TitleSection from "@src/components/TitleSection.tsx";
import AboutSection from "@src/components/AboutSection.tsx";
import SectionHeading from "@src/components/SectionHeading.tsx";

// Projects
import FilterSelect from "@src/components/FilterSelect.tsx";
import Project from "@src/components/Project.tsx";

// Experience
import ExperienceEntry from "@src/components/ExperienceEntry.tsx";

// Contact
import ContactForm, { FormEventT } from "@src/components/ContactForm.tsx";
import SocialSidebar from "@src/components/SocialSidebar.tsx";
import { wait } from "@src/utils/util";

export type HomePageComponentProps = {
  // onFilterClick: (e: React.MouseEvent) => void;
  onNavigateToProject: (e: React.MouseEvent, project: ProjectT) => Promise<void> | void;
};

function HomePage({onNavigateToProject, onFilterClick}: HomePageComponentProps) {
  const [filters] = useFilters();
  const [projects] = useProjects();
  const [expEntries] = useExperienceEntries();
  const [selectedFilter, setSelectedFilter] = useSelectedFilter(filters);
  const [filteredProjects] = useFilteredProjects(
    projects,
    filters,
    selectedFilter
  );
  const [clickedFilterOffset, setClickedFilterOffset] = useState(0);
  const [clickedFilter, setClickedFilter] = useState<Element | null>();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pageRef = useRef<HTMLDivElement | null>(null);
  const ttlRef = useRef<HTMLElement | null>(null);
  const abtRef = useRef<HTMLElement | null>(null);
  const projRef = useRef<HTMLElement | null>(null);
  const expRef = useRef<HTMLElement | null>(null);
  const contRef = useRef<HTMLElement | null>(null);
  const ftrRef = useRef<HTMLElement | null>(null);

  const [formState, setFormState] = useState("pending"); // pending, error, submitted

  useHomePageLines(
    canvasRef,
    {
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

  const handleFormStateChange = (formEvent: FormEventT) => {
    setFormState(formEvent);
  };

  const getFilterYOffset = (clickedElement: Element) => {
    return clickedElement.getBoundingClientRect().top;
  }

  const handleMoreInfoClick = (e: React.MouseEvent, project: ProjectT) => {
    onNavigateToProject(e, project)
  }

  const handleTagSelect = async (e: React.MouseEvent, tag: TagT) => {
    const clickedElement = e.currentTarget as Element;

    // TODO: Do I REEEEALLY have to store the filter and offset
    // if I want to wait for the layout event...?  ugh...
    setClickedFilter(clickedElement);
    setClickedFilterOffset(getFilterYOffset(clickedElement));

    setSelectedFilter(tag);
};

  useLayoutEffect(() => {
    if (!clickedFilter) { return; }
    const t1 = clickedFilterOffset;
    const t2 = getFilterYOffset(clickedFilter);
    const dt = t1 - t2;
    const scrollPos = window.scrollY - dt;

    window.scrollTo({
      top: scrollPos,
      behavior: 'instant'
    });
  }, [filteredProjects])
  // TODO: I don't want this to re-run when clickedFilter
  // or clickedFilterOffset change, so I should do a linter
  // skip line or something

  return (
    <>
        <div ref={pageRef} className={`page`} id='home-page'>

          <canvas id="canvas" ref={canvasRef} height="100%" width="100%"></canvas>

          <section ref={ttlRef} className="triangle-left">
            <TitleSection></TitleSection>
          </section>

          <section
            id="about"
            className="trapezoid-right"
            ref={abtRef}
          >
            <AboutSection></AboutSection>
          </section>

          <section id="projects" ref={projRef}>
            <div className="h-centered projects">
              <div className="v-spaced grid-at-small">
                <SectionHeading className="half">Projects</SectionHeading>

                <FilterSelect
                  filters={filters}
                  selectedFilter={selectedFilter}
                  onFilterChange={handleFilterChange}
                ></FilterSelect>
              </div>

              {Object.keys(filteredProjects).map((companyName) => (
                <React.Fragment key={companyName}>
                  <h4 className="v-spaced subtitle-2">{companyName}</h4>
                  <ul>
                    {filteredProjects[companyName].map((project) => (
                      <Project
                        key={project.id}
                        project={project}
                        selectedTags={selectedFilter?.tags ?? []}
                        onTagSelect={handleTagSelect}
                        onMoreInfoClick={handleMoreInfoClick}
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
            className="trapezoid-hug"
          >
            <div className="h-centered experience">
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
            className="color-bar"
          >
            <div className="h-centered contact grid-at-med">
              <SectionHeading>Contact</SectionHeading>
              <ContactForm
                onFormStateChange={handleFormStateChange}
              ></ContactForm>
              <SocialSidebar></SocialSidebar>
            </div>
          </section>

          <section ref={ftrRef} id="footer-section">
            <div className="h-centered footer">
              <p>
                Curious about this build? <br /> Check out the{" "}
                <a
                  className="link"
                  href="https://github.com/JessicaBarnett/JessicaBarnett.github.io"
                  target="_blank"
                >
                  source code
                </a>{" "}
                and{" "}
                <a className="link" href="/docs/index" target="_blank">
                  storybook!
                </a>
              </p>
            </div>
          </section>
        </div>
    </>
  );
}

export default HomePage;
