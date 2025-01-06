import { LinkedinIcon } from "@src/icons/LinkedinIcon.tsx";
import { GithubIcon } from "@src/icons/GithubIcon.tsx";
import { LoveIcon } from "@src/icons/LoveIcon.tsx";

const SocialSidebar = () => {
  return (
    <div className="social-sidebar one-third">
      <p className="made-with-love">
        Made with <LoveIcon></LoveIcon> in Philadelphia
      </p>
      <a
        className="social-link"
        target="_blank"
        href="https://www.linkedin.com/in/jessica-m-barnett/"
      >
        <LinkedinIcon></LinkedinIcon>
        <span className="social-link-text">LinkedIn</span>
      </a>

      <a
        className="social-link"
        target="_blank"
        href="https://github.com/JessicaBarnett"
      >
        <GithubIcon></GithubIcon>
        <span className="social-link-text">Github</span>
      </a>
    </div>
  );
};

export default SocialSidebar;
