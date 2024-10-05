import "./App.css";

function App() {
  return (
    <>
      <canvas id="canvas"></canvas>
      <div className="page">
        <section className="section-title triangle-left">
          <div className="section-content indent-64 ">
            <h1 className="title-1">
              <span className="outdent-1">Jessica </span>
              Barnett
            </h1>
            <h2 className="indent-2 subtitle-1">
              <span className="outdent-1">Front-End / FullStack </span>
              <span className="nowrap">Software Engineer</span>
            </h2>
          </div>
        </section>

        <section className="section-about trapezoid-right indent-2">
          <div className="section-content indent-64">
            <p className="deco-font-1">
              <em className="outdent-1">Hello.</em>
            </p>
            <p className="deco-font-2 ">
              My name is Jessica{" "}
              <span className="nowrap">and I make web things.</span>
            </p>
            <p className="indent-1 deco-font-3">Thanks for dropping by!</p>
          </div>
        </section>

        <section className="section-projects">
          <div className="section-content grid-at-small">
            <h3 className="section-heading title-2 half">Projects</h3>
            <div className="filter-group half">
              <label htmlFor="filterProjects">Filter</label>
              <select
                className="clear"
                name="filterProjects"
                id="filterProjects"
              >
                <option selected>Filter</option>
                <option value="javascript">Javascript</option>
                <option value="typescript">Typescript</option>
                <option value="react">React</option>
                <option value="angular">Angular</option>
                <option value="node">Node</option>
                <option value="aws">AWS</option>
                <option value="rails">Ruby/Rails</option>
                <option value="pgsql">Postgres/SQL</option>
                <option value="twilio">Twilio</option>
                <option value="jquery">JQuery</option>
                <option value="css">CSS/SCSS</option>
                <option value="html">Html</option>
              </select>
            </div>

            <ol>
              <h4 className="section-subheading subtitle-2">Relay Network</h4>

              <li className="entry">
                <h5 className="title-3">Service Load Testing</h5>
                <p>
                  Performed large-scale Load tests on our SSO Api and our Forms
                  APIs, automating up to 500k user sessions across 3 small
                  servers.
                </p>
                <button className="btn-1 filter-projects" type="button">
                  Locust
                </button>
                <button className="btn-1 filter-projects" type="button">
                  AWS EC2
                </button>
                <button className="btn-1 filter-projects" type="button">
                  Bash/Zsh
                </button>
              </li>

              <li className="entry">
                <h5 className="title-3">"Power Ups" Forms Integration API</h5>
                <p>
                  Worked with team to build a feature enabling businesses to
                  configure forms to send to their customer's phones, along with
                  monitoring and data management/reporting tools.
                </p>
                <button className="btn-1 filter-projects" type="button">
                  Javascript
                </button>
                <button className="btn-1 filter-projects" type="button">
                  React
                </button>
                <button className="btn-1 filter-projects" type="button">
                  Node
                </button>
                <button className="btn-1 filter-projects" type="button">
                  AWS ECS
                </button>
                <button className="btn-1 filter-projects" type="button">
                  Postgres/SQL
                </button>
              </li>

              <li className="entry">
                <h5 className="title-3">Two Way Chat v2.0</h5>
                <p>
Collaboratively took the two-way chat pilot from tiny and fragile to hardened and reliable. Migrated all backend code from clojure to node, migrated data to a small self-contained postgres instance, and added customer-facing chat ui to the newly rebuilt feed app.
                </p>
                <button className="btn-1 filter-projects" type="button">
                  Typescript
                </button>
                <button className="btn-1 filter-projects" type="button">
                  React
                </button>
                <button className="btn-1 filter-projects" type="button">
                  Node
                </button>
                <button className="btn-1 filter-projects" type="button">
                  Twilio
                </button>
                <button className="btn-1 filter-projects" type="button">
                  AWS ECS
                </button>
                <button className="btn-1 filter-projects" type="button">
                  Postgres/SQL
                </button>
              </li>

              {/* START Project Component */}
              <li className="entry">
                <h5 className="title-3">Relay Feed v3.0</h5>
                <p>
Collaborated with team to completely rebuild Relay's customer-facing "social feed for businesses" app, with a completely new stack and design.
                </p>
                <button className="btn-1 filter-projects" type="button">
                  Javascript
                </button>
                <button className="btn-1 filter-projects" type="button">
                  React
                </button>
                <button className="btn-1 filter-projects" type="button">
                  Node
                </button>
              </li>
              {/* END Project Component */}

              <li className="entry">
                <h5 className="title-3">CXBuilder SSO Api</h5>
                <p>
Developed a feature to allow business clients to log into Relay's product via sso, and was responsible for client communications about sso setup for a full year.
                </p>
                <button className="btn-1 filter-projects" type="button">
                  Angular
                </button>
                <button className="btn-1 filter-projects" type="button">
                  Typescript
                </button>
                <button className="btn-1 filter-projects" type="button">
                  Node
                </button>
                <button className="btn-1 filter-projects" type="button">
                  AWS ECS
                </button>
                <button className="btn-1 filter-projects" type="button">
                  AWS Cognito
                </button>
              </li>

              <li className="entry">
                <h5 className="title-3">File Engine Jobs Dashboard</h5>
                <p>TBA</p>
                <button className="btn-1 filter-projects" type="button">
                  Angular
                </button>
                <button className="btn-1 filter-projects" type="button">
                  Typescript
                </button>
                <button className="btn-1 filter-projects" type="button">
                  CSS/SCSS
                </button>
              </li>

              <li className="entry">
                <h5 className="title-3">Two Way Chat Pilot</h5>
                <p>
Worked with team to build a complex chat feature in 2 months. Contributed roughly 50% of the Angular code, and collaborated closely with product reps and clojure engineers on both API and Visual design.
                </p>
                <button className="btn-1 filter-projects" type="button">
                  Typescript
                </button>
                <button className="btn-1 filter-projects" type="button">
                  Angular
                </button>
                <button className="btn-1 filter-projects" type="button">
                  Twilio
                </button>
                <button className="btn-1 filter-projects" type="button">
                  Clojure
                </button>
              </li>

              <li className="entry">
                <h5 className="title-3">PDF Preview Feature</h5>
                <p>TBA</p>
                <button className="btn-1 filter-projects" type="button">
                  Angular
                </button>
                <button className="btn-1 filter-projects" type="button">
                  Typescript
                </button>
                <button className="btn-1 filter-projects" type="button">
                  CSS/SCSS
                </button>
                <button className="btn-1 filter-projects" type="button">
                  AWS Lambda
                </button>
              </li>

              <li className="entry">
                <h5 className="title-3">Relay Feed Accessibility Audit</h5>
                <p>Ran an accessibility audit on our customer-facing Feed application.  Identified and implemented a number of fixes including adding alt text to uploaded images, revamping the mobile navigation, and using aria tags much more liberally.</p>
                <button className="btn-1 filter-projects" type="button">
                  Angular
                </button>
                <button className="btn-1 filter-projects" type="button">
                  Typescript
                </button>
                <button className="btn-1 filter-projects" type="button">
                  CSS/SCSS
                </button>
              </li>

              <li className="entry">
                <h5 className="title-3">Relay Company Website v2.0</h5>
                <p>Worked with a small 3 person team to completely overhaul Relay's old company site.  We gave it a fresh and beautiful new design, new branding, and made it far easier for marketing to develop content for it going forward.</p>
                <button className="btn-1 filter-projects" type="button">
                  Craft CMS
                </button>
                <button className="btn-1 filter-projects" type="button">
                  Javascript
                </button>
                <button className="btn-1 filter-projects" type="button">
                  HTML/Twig
                </button>
                <button className="btn-1 filter-projects" type="button">
                  CSS/SCSS
                </button>
                <button className="btn-1 filter-projects" type="button">
                  AWS
                </button>
              </li>

              <h4 className="section-subheading subtitle-2">
                Weblinc Ecommerce
              </h4>

              <li className="entry">
                <h5 className="title-3">The Bouqs</h5>
                <p>
                  TBA
                </p>
                <button className="btn-1 filter-projects" type="button">
                  Javascript
                </button>
                <button className="btn-1 filter-projects" type="button">
                  JQuery
                </button>
                <button className="btn-1 filter-projects" type="button">
                  Ruby/Rails
                </button>
                <button className="btn-1 filter-projects" type="button">
                  HTML/Haml
                </button>
                <button className="btn-1 filter-projects" type="button">
                  CSS/SCSS
                </button>
              </li>

              <li className="entry">
                <h5 className="title-3">Woodcraft & Japan Woodworker</h5>
                <p>
Contributed half of the front-end code for Woodcraft's initial build, and then took over front-end leadership of new feature work on the project. Led the development of a reskin of the same app to showcase their more upscale tool brand, Japan Woodworker.
                </p>
                <button className="btn-1 filter-projects" type="button">
                  Javascript
                </button>
                <button className="btn-1 filter-projects" type="button">
                  JQuery
                </button>
                <button className="btn-1 filter-projects" type="button">
                  Ruby/Rails
                </button>
                <button className="btn-1 filter-projects" type="button">
                  HTML/Haml
                </button>
                <button className="btn-1 filter-projects" type="button">
                  CSS/SCSS
                </button>
              </li>

              <li className="entry">
                <h5 className="title-3">Rachel Roy</h5>
                <p>Led new feature development on an existing website.</p>
                <button className="btn-1 filter-projects" type="button">
                  Javascript
                </button>
                <button className="btn-1 filter-projects" type="button">
                  JQuery
                </button>
                <button className="btn-1 filter-projects" type="button">
                  Ruby/Rails
                </button>
                <button className="btn-1 filter-projects" type="button">
                  HTML/Haml
                </button>
                <button className="btn-1 filter-projects" type="button">
                  CSS/SCSS
                </button>
              </li>

              <li className="entry">
                <h5 className="title-3">Full Beauty</h5>
                <p>
A massive new website for a venerable brand offering a huge variety of plus-size apparel. I contributed the vast majority of the front-end code to this project.
                </p>
                <button className="btn-1 filter-projects" type="button">
                  Javascript
                </button>
                <button className="btn-1 filter-projects" type="button">
                  JQuery
                </button>
                <button className="btn-1 filter-projects" type="button">
                  Ruby/Rails
                </button>
                <button className="btn-1 filter-projects" type="button">
                  HTML/Haml
                </button>
                <button className="btn-1 filter-projects" type="button">
                  CSS/SCSS
                </button>
              </li>

              <li className="entry">
                <h5 className="title-3">Mint Julep</h5>
                <p>
                  Built small features for a fun and lively southern-us-focused fashion brand.
                </p>
                <button className="btn-1 filter-projects" type="button">
                  Javascript
                </button>
                <button className="btn-1 filter-projects" type="button">
                  JQuery
                </button>
                <button className="btn-1 filter-projects" type="button">
                  Ruby/Rails
                </button>
                <button className="btn-1 filter-projects" type="button">
                  HTML/Haml
                </button>
                <button className="btn-1 filter-projects" type="button">
                  CSS/SCSS
                </button>
              </li>
            </ol>
          </div>
        </section>

        <section className="section-resume trapezoid-hug">
          <div className="section-content">
            <h3 className="section-heading title-2">Resume</h3>

            <ol>
              {/* Begin Experience Component */}
              <li className="entry">
                <div className="supertitle-3">
                  <time dateTime="2018">2020</time> -{" "}
                  <time dateTime="2238">2023</time>
                </div>
                <h4 className="title-3">Fullstack Software Engineer</h4>
                <p className="subtitle-3">Relay Network</p>
                <button className="btn-1" type="button">
                  Typescript
                </button>
                <button className="btn-1" type="button">
                  React
                </button>
                <button className="btn-1" type="button">
                  Angular
                </button>
                <button className="btn-1" type="button">
                  Node
                </button>
                <button className="btn-1" type="button">
                  AWS
                </button>
              </li>
              {/* End Experience Component */}

              {/* Begin Experience Component */}
              <li className="entry">
                <div className="supertitle-3">
                  <time dateTime="2018">2018</time> -{" "}
                  <time dateTime="2238">2020</time>
                </div>
                <h4 className="title-3">Front End Software Engineer</h4>
                <p className="subtitle-3">Relay Network</p>
                <button className="btn-1" type="button">
                  Typescript
                </button>
                <button className="btn-1" type="button">
                  Angular
                </button>
                <button className="btn-1" type="button">
                  CSS/SCSS
                </button>
                <button className="btn-1" type="button">
                  CraftCMS
                </button>
              </li>
              {/* End Experience Component */}

              {/* Begin Experience Component */}
              <li className="entry">
                <div className="supertitle-3">
                  <time dateTime="2018">2016</time> -{" "}
                  <time dateTime="2238">2018</time>
                </div>
                <h4 className="title-3">Lead Front End Developer</h4>
                <p className="subtitle-3">Weblinc Ecommerce</p>
                <button className="btn-1 filter-projects" type="button">
                  Javascript
                </button>
                <button className="btn-1 filter-projects" type="button">
                  JQuery
                </button>
                <button className="btn-1 filter-projects" type="button">
                  Ruby/Rails
                </button>
                <button className="btn-1 filter-projects" type="button">
                  HTML/Haml
                </button>
                <button className="btn-1 filter-projects" type="button">
                  CSS/SCSS
                </button>
              </li>
              {/* End Experience Component */}

              {/* Begin Experience Component */}
              <li className="entry">
                <div className="supertitle-3">
                  <time dateTime="2018">2016</time> -{" "}
                  <time dateTime="2238">2018</time>
                </div>
                <h4 className="title-3">Front End Developer</h4>
                <p className="subtitle-3">Weblinc Ecommerce</p>
                <button className="btn-1 filter-projects" type="button">
                  Javascript
                </button>
                <button className="btn-1 filter-projects" type="button">
                  JQuery
                </button>
                <button className="btn-1 filter-projects" type="button">
                  Ruby/Rails
                </button>
                <button className="btn-1 filter-projects" type="button">
                  HTML/Haml
                </button>
                <button className="btn-1 filter-projects" type="button">
                  CSS/SCSS
                </button>
              </li>
              {/* End Experience Component */}
            </ol>
          </div>
        </section>

        <section className="section-contact color-bar">
          <div className="section-content grid ">
            <h3 className="section-heading title-2">Contact</h3>

            {/* Begin ContactForm Component */}
            <form
              className="contact-form two-third"
              action="https://api.web3forms.com/submit"
              method="POST"
            >
              <input
                type="hidden"
                name="access_key"
                className="hidden"
                value="ACCESS_KEY"
              ></input>
              <input type="checkbox" name="botcheck" className="hidden"></input>

              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name"></input>

              <label htmlFor="email">Email</label>
              <input type="text" name="email" id="email"></input>

              <label htmlFor="subject">Subject</label>
              <input type="text" name="subject" id="subject"></input>

              <label htmlFor="message">Message</label>
              <textarea name="message" id="message"></textarea>

              <button className="btn-2" type="submit">
                Send
              </button>
            </form>
            {/* End ContactForm  Component */}

            <div className="sidebar-right one-third">
              <p className="made-with-love">
                Made with{" "}
                <img
                  className="icon-sm"
                  alt="love"
                  src="/assets/icons/love-icon-dark.png"
                ></img>{" "}
                in Philadelphia{" "}
              </p>

              <a className="social-link" href="#">
                <img
                  className="icon-lg"
                  alt="Linkedin Icon"
                  src="/assets/icons/linkedin-icon-dark.png"
                ></img>
                <span>LinkedIn</span>
              </a>

              <a className="social-link" href="#">
                <img
                  className="icon-lg"
                  alt="Github Icon"
                  src="/assets/icons/github-icon-dark.png"
                ></img>
                <span>Github</span>
              </a>
            </div>
          </div>
        </section>

        <section className="section-footer">
          <div className="section-content">
            <table className="page-stats-table">
              <tr>
                <th>Language</th>
                <th>HTML</th>
                <th>SCSS</th>
                <th>JS</th>
              </tr>
              <tr>
                <th>Percent</th>
                <td>20%</td>
                <td>40%</td>
                <td>40%</td>
              </tr>
              <tr>
                <th>Lines</th>
                <td colSpan="3">6000 lines</td>
              </tr>
            </table>

            <a className="page-stats-button" href="#">
              <button className="btn-2" type="button">
                Source
              </button>
            </a>
            <p className="page-stats-text">
              Project built with Sass, React, and Vite.
            </p>
          </div>
        </section>
      </div>{" "}
      {/* end page */}
    </>
  );
}

export default App;
