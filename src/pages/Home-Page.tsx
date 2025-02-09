import React, { useLayoutEffect, useRef, useState } from "react";

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

export type HomePageComponentProps = {
  onNavigateToProject: (project: ProjectT) => void;
};

function HomePage({onNavigateToProject}: HomePageComponentProps) {
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

  const handleTagSelect = (tag: TagT) => {
    setSelectedFilter(tag);
  };

  const handleMoreInfoClick = (project: ProjectT) => {
    onNavigateToProject(project)
  }

  return (
    <>
        <div ref={pageRef} className={`page`} id='home-page'>

          <canvas id="canvas" ref={canvasRef} height="100%" width="100%"></canvas>

          <section ref={ttlRef} className="triangle-left">
            <TitleSection></TitleSection>
          </section>

          <section
            id="about-section"
            className="trapezoid-right"
            ref={abtRef}
          >
            <AboutSection></AboutSection>
          </section>

          <section id="projects-section" ref={projRef}>
            <div className="h-centered projects grid-at-small">
              <SectionHeading className="half">Projects</SectionHeading>

              <FilterSelect
                filters={filters}
                selectedFilter={selectedFilter}
                onFilterChange={handleFilterChange}
              ></FilterSelect>

              {Object.keys(filteredProjects).map((companyName) => (
                <React.Fragment key={companyName}>
                  <h4 className="section-subheading subtitle-2">{companyName}</h4>
                  <ul>
                    {filteredProjects[companyName].map((project) => (
                      <Project
                        key={project.id}
                        project={project}
                        selectedTags={selectedFilter?.tags ?? []}
                        onTagSelect={handleTagSelect}
                        onMoreInfoClick={() => handleMoreInfoClick(project)}
                      ></Project>
                    ))}
                  </ul>
                </React.Fragment>
              ))}
            </div>
          </section>

          <section
            id="experience-section"
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
            id="contact-section"
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
