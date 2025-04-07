
import { PlayIcon } from "@src/icons/PlayIcon.tsx";
import { PauseIcon } from "@src/icons/PauseIcon.tsx";
import { StopIcon } from "@src/icons/StopIcon.tsx";
import { RewindIcon } from "@src/icons/RewindIcon.tsx";
import { Link, useLocation } from "react-router-dom";


export type NavigationComponentProps = {
   onNavigation: (e: React.MouseEvent) => void;
};


const Navigation = ({ onNavigation }: NavigationComponentProps) => {
    const location = useLocation();

    const hideHomeLink = (): boolean => {
        return location.pathname === '/';
    }

    // TODO:  pretty sure this all should be done with a loader or something.  Need to read up.  This will work in the interim
    const handleNavClick = async (e: React.MouseEvent<HTMLElement>) => {
        onNavigation(e);
    };

    return (
        <div id="nav" className="nav">
            <nav className="nav-links">
                <Link to={`/#home`} className={`nav-link nav-link-home ${hideHomeLink() ? 'nav-link-hidden' : ''}`} onClick={handleNavClick} viewTransition>
                    <RewindIcon></RewindIcon>
                    <span>home</span>
                </Link>
                <Link to={`/#projects`} className="nav-link" onClick={handleNavClick} viewTransition>
                    <PlayIcon></PlayIcon>
                    <span>projects</span>
                </Link>
                <Link to={`/#experience`} className="nav-link nav-link-exp" onClick={handleNavClick} viewTransition>
                    <PauseIcon></PauseIcon>
                    <span>experience</span>
                </Link>
                <Link to={`/#contact`} className="nav-link" onClick={handleNavClick} viewTransition>
                    <StopIcon></StopIcon>
                    <span>contact</span>
                </Link>
            </nav>
        </div>
    );
}

export default Navigation;