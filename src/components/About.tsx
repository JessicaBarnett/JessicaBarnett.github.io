import { PlayIcon } from "@src/icons/PlayIcon.tsx";
import { PauseIcon } from "@src/icons/PauseIcon.tsx";
import { StopIcon } from "@src/icons/StopIcon.tsx";

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
            </div>
            <div className="flex">

                <div>
                    <PlayIcon></PlayIcon>
                    <h3>Software Development</h3>
                    <p>Experienced in development of both front and back end systems.  Ruby, Typescript</p>
                </div>
                <div>
                    <PauseIcon></PauseIcon>
                    <h3>Front End Dev, React, Angular</h3>
                    <p>Passionate about UI/UX.  Over 8 years of development experience in Html, Css, JS, Angular, and React.</p>
                </div>
                <div>
                    <StopIcon></StopIcon>
                    <h3>Web Designer</h3>
                    <p>Skilled in creating and designing high-end visuals and animations with css3 and webgl</p>
                </div>

            </div>
        </div>
    </>
  );
}

export default AboutSection;
