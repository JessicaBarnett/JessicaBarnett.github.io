
import { PlayIcon } from "@src/icons/PlayIcon.tsx";
import { PauseIcon } from "@src/icons/PauseIcon.tsx";
import { StopIcon } from "@src/icons/StopIcon.tsx";

function Navigation() {
    const handleNavClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const id = e.currentTarget.getAttribute('href')?.slice(1) || '';
        window.scrollTo({
            top: document.getElementById(id)!.offsetTop - 55,
            left: 0,
            behavior: 'smooth'
        });
      };

    return (
        <div className="nav">
            <nav className="nav-links">
                <a className="nav-link" href="#projects" onClick={handleNavClick}>
                    <PlayIcon></PlayIcon>
                    <span>projects</span>
                </a>
                <a className="nav-link" href="#experience" onClick={handleNavClick}>
                    <PauseIcon></PauseIcon>
                    <span>experience</span>
                </a>
                <a className="nav-link" href="#contact" onClick={handleNavClick}>
                    <StopIcon></StopIcon>
                    <span>contact</span>
                </a>
            </nav>
        </div>
);
}

export default Navigation;