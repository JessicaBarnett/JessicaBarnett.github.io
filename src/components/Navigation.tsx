
import { PlayIcon } from "@src/icons/PlayIcon.tsx";
import { PauseIcon } from "@src/icons/PauseIcon.tsx";
import { StopIcon } from "@src/icons/StopIcon.tsx";

function Navigation() {

    return (
        <div className="nav">
            <nav className="nav-links">
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
);
}

export default Navigation;