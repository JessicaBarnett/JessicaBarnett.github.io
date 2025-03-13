
import { PlayIcon } from "@src/icons/PlayIcon.tsx";
import { PauseIcon } from "@src/icons/PauseIcon.tsx";
import { StopIcon } from "@src/icons/StopIcon.tsx";
import { NavLink } from "react-router";


export type NavigationComponentProps = {
   onNavigation: (e: React.MouseEvent) => void;
};

function Navigation({ onNavigation }: NavigationComponentProps) {
    // TODO:  pretty sure this all should be done with a loader or something.  Need to read up.  This will work in the interim
    const handleNavClick = async (e: React.MouseEvent<HTMLElement>) => {
        onNavigation(e);
    };

    return (
        <div id="nav" className="nav">
            <nav className="nav-links">
                <NavLink to={`/#projects`} className="nav-link" onClick={handleNavClick} viewTransition>
                    <PlayIcon></PlayIcon>
                    <span>projects</span>
                </NavLink>
                <NavLink to={`/#experience`} className="nav-link" onClick={handleNavClick} viewTransition>
                    <PauseIcon></PauseIcon>
                    <span>experience</span>
                </NavLink>
                <NavLink to={`/#contact`} className="nav-link" onClick={handleNavClick} viewTransition>
                    <StopIcon></StopIcon>
                    <span>contact</span>
                </NavLink>
            </nav>
        </div>
);
}

export default Navigation;