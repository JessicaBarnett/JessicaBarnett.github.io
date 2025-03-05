
import { PlayIcon } from "@src/icons/PlayIcon.tsx";
import { PauseIcon } from "@src/icons/PauseIcon.tsx";
import { StopIcon } from "@src/icons/StopIcon.tsx";
import { NavLink, useNavigate } from "react-router";

const getTargetId = (currentTarget: EventTarget & HTMLElement): string | null => {
    const href = currentTarget.getAttribute('href') || '';
    const matchObj = href.match(/#(.*)/);
    return matchObj !== null ? matchObj[1] : null;
}

function Navigation() {
    const navigate = useNavigate();

    const handleNavClick = (e: React.MouseEvent<HTMLElement>) => {
        navigate('/');
        e.preventDefault();
        const id = getTargetId(e.currentTarget);
        if (id !== null) {
            window.scrollTo({
                top: document.getElementById(id)!.offsetTop - 55,
                left: 0,
                behavior: 'smooth'
            });
        }
      };

    return (
        <div className="nav">
            <nav className="nav-links">
                <NavLink to={`/#projects-section`} onClick={handleNavClick}>
                    <PlayIcon></PlayIcon>
                    <span>projects</span>
                </NavLink>
                <NavLink to={`/#experience-section`} onClick={handleNavClick}>
                    <PauseIcon></PauseIcon>
                    <span>experience</span>
                </NavLink>
                <NavLink to={`/#contact-section`} onClick={handleNavClick}>
                    <StopIcon></StopIcon>
                    <span>contact</span>
                </NavLink>
                {/* <a className="nav-link" href="/#projects-section" onClick={handleNavClick}>
                    <PlayIcon></PlayIcon>
                    <span>projects</span>
                </a>
                <a className="nav-link" href="/#experience-section" onClick={handleNavClick}>
                    <PauseIcon></PauseIcon>
                    <span>experience</span>
                </a>
                <a className="nav-link" href="/#contact-section" onClick={handleNavClick}>
                    <StopIcon></StopIcon>
                    <span>contact</span>
                </a> */}
            </nav>
        </div>
);
}

export default Navigation;