import { PlayIcon } from "@src/icons/PlayIcon.tsx";
import { PauseIcon } from "@src/icons/PauseIcon.tsx";
import { StopIcon } from "@src/icons/StopIcon.tsx";

import '@styles/components/about.scss';

function AboutSection() {
  return (
    <>
        <div className="content  section-about">
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
    </>
  );
}

export default AboutSection;
