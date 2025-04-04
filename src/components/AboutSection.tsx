import { scrollToId } from "@src/utils/nav-utils";

function AboutSection() {
  return (
    <>
        <div className="h-centered">
            <div className="indent-2">
                <p className="outdent-1 deco-font-1">
                    Hello.
                </p>
                <p className="indent-1 deco-font-2 ">
                    My name is Jessica!
                </p>
                <div className="paragraph-group">
                    <p className="indent-2 deco-font-3 ">
                        I've been crafting <em>beautiful user experiences</em> since 2014 and <em>high-quality node apps</em> since 2021.  I strive to <em>use technology to make people's lives easier</em>, one keystroke at a time.
                    </p>
                </div>
                <p className="deco-font-4 emphasized-p">
                    Want to work with me?  Great!  Drop me a line using the <a className="link" href="#contact" onClick={(e) => scrollToId('contact', e)}>contact form</a>;  Otherwise, Feel free to peruse my <a className="link" href="#projects" onClick={(e) => scrollToId('projects', e)}>projects</a> and <a className="link" href="#experience" onClick={(e) => scrollToId('experience', e)}>experience</a> below.
                </p>
            </div>

        </div>
    </>
  );
}

export default AboutSection;
