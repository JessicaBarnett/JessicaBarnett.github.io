import ContactForm from "@src/components/ContactForm.tsx";
import { LinkedinIcon } from "@src/icons/LinkedinIcon.tsx";
import { GithubIcon } from "@src/icons/GithubIcon.tsx";
import { LoveIcon } from "@src/icons/LoveIcon.tsx";


import '@styles/components/contact.scss';

function ContactSection() {
  return (
    <>
      <div className="content content-contact grid-at-med">
        <h3 className="section-heading title-2">Contact</h3>

        <ContactForm></ContactForm>

        <div className="sidebar-right one-third">
          <p className="made-with-love">
            Made with <LoveIcon></LoveIcon> in Philadelphia
          </p>
          {/* <img
              className="icon-sm"
              alt="love"
              src="/assets/icons/love-icon-dark.png"
            ></img>{" "} */}

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
      </div>
    </>
  );
}

export default ContactSection;