import "./App.css";

import { useRef } from "react";

import { useFilters } from "@src/hooks/static/useFilters.ts";
import { useProjects } from "@src/hooks/static/useProjects.ts";
import { useExperienceEntries } from "@src/hooks/static/useExperienceEntries.ts";
import { useSelectedFilter } from "@src/hooks/useSelectedFilter.ts";
import { useFilteredProjects } from "@src/hooks/useFilteredProjects.ts";

import { useBgLines } from "@src/hooks/useBgLines.ts";

import AboutSection from "@src/sections/About.tsx";
import TitleSection from "@src/sections/Title.tsx";
import ExperienceSection from "@src/sections/Experience.tsx";
import ProjectsSection from "@src/sections/Projects.tsx";
import ContactSection from "@src/sections/Contact.tsx";
import FooterSection from "./sections/Footer.tsx";
import Navigation from "./components/Navigation.tsx";

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

  return (
    <>
      <div ref={fixedNavRef}>
        <Navigation></Navigation>
      </div>

      <div className="layout">
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

          <section id="about" ref={abtRef}>
            <AboutSection></AboutSection>
          </section>

          <section id="projects" ref={projRef}>
            <ProjectsSection
              filteredProjects={filteredProjects}
              filters={filters}
              selectedFilter={selectedFilter}
              onFilterChange={handleFilterChange}
            ></ProjectsSection>
          </section>

          <section
            id="experience"
            ref={expRef}
            className="section-experience trapezoid-hug"
          >
            <ExperienceSection expEntries={expEntries}></ExperienceSection>
          </section>

          <section
            id="contact"
            ref={contRef}
            className="section-contact color-bar"
          >
            <ContactSection></ContactSection>
          </section>

          <section ref={ftrRef} className="section-footer">
            <FooterSection></FooterSection>
          </section>
        </div>
      </div>
    </>
  );
}

export default App;
