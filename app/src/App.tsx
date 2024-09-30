import "./App.css"

function App() {

  return (
    <>
      <div className="page">
        <div className="content">

          <section className="indent-1">
            <h1 className="title-1">
              <span className="outdent-1">Jessica </span>
              Barnett
            </h1>
            <h2 className="indent-2 subtitle-1">
              <span className="outdent-1">Front-End / FullStack </span>
              <span className="nowrap">Software Engineer</span>
            </h2>
          </section>


          <section className="section-about indent-2">
            <p className="deco-font-1">
              <em className="outdent-1">Hello.</em>
            </p>
            <p className="deco-font-2 ">
              My name is Jessica <span className="nowrap">and I make web things.</span>
            </p>
            <p className="indent-1 deco-font-3">
              Thanks for dropping by!
            </p>
          </section>


          <section className="section-projects indent-2">
            <h3 className="section-heading title-2">Projects</h3>
            <div className="filter-group">
            <label htmlFor="filterProjects">Filter</label>
            <select className="clear" name="filterProjects" id="filterProjects">
              <option selected>Filter</option>
              <option>Node</option>
              <option>Javascript</option>
              {/* populate with filters from project data */}
            </select>
            </div>


            <ol>
              <h4 className="section-subheading subtitle-2">Relay Network</h4>

              {/* START Project Component */}
              <li className="entry">
                <h5 className="title-3">Project Name</h5>
                <p>This is a block of text that describes the project.  It isn't super long or detailed, but should give just enough information.</p>
                <button className="btn-1 filter-projects" type="button">Javascript</button>
                <button className="btn-1 filter-projects" type="button">React</button>
                <button className="btn-1 filter-projects" type="button">Node</button>
              </li>
              {/* END Project Component */}

              <li className="entry">
                <h5 className="title-3">Project Name</h5>
                <p>This is a block of text that describes the project.  It isn't super long or detailed, but should give just enough information.</p>
                <button className="btn-1 filter-projects" type="button">Javascript</button>
                <button className="btn-1 filter-projects" type="button">React</button>
                <button className="btn-1 filter-projects" type="button">Node</button>
              </li>

              <h4 className="section-subheading subtitle-2">Weblinc Ecommerce</h4>

              <li className="entry">
                <h5 className="title-3">Project Name</h5>
                <p>This is a block of text that describes the project.  It isn't super long or detailed, but should give just enough information.</p>
                <button className="btn-1 filter-projects" type="button">Javascript</button>
                <button className="btn-1 filter-projects" type="button">React</button>
                <button className="btn-1 filter-projects" type="button">Node</button>
              </li>

              <li className="entry">
                <h5 className="title-3">Project Name</h5>
                <p>This is a block of text that describes the project.  It isn't super long or detailed, but should give just enough information.</p>
                <button className="btn-1 filter-projects" type="button">Javascript</button>
                <button className="btn-1 filter-projects" type="button">React</button>
                <button className="btn-1 filter-projects" type="button">Node</button>
              </li>
            </ol>

          </section>


          <section className="section-resume indent-2">
            <h3 className="section-heading title-2">Resume</h3>

            <ol>

              {/* Begin Experience Component */}
              <li className="entry">
                <div className="supertitle-3"><time dateTime="2018">2018</time> - <time dateTime="2238">2023</time></div>
                <h4 className="title-3">Front End Engineer</h4>
                <p className="subtitle-3">Company Name</p>
                <button className="btn-1" type="button">Javascript</button>
                <button className="btn-1" type="button">React</button>
                <button className="btn-1" type="button">Node</button>
              </li>
              {/* End Experience Component */}

              {/* Begin Experience Component */}
              <li className="entry">
                <div className="supertitle-3"><time dateTime="2018">2018</time> - <time dateTime="2238">2023</time></div>
                <h4 className="title-3">Front End Engineer</h4>
                <p className="subtitle-3">Company Name</p>
                <button className="btn-1" type="button">Javascript</button>
                <button className="btn-1" type="button">React</button>
                <button className="btn-1" type="button">Node</button>
              </li>
              {/* End Experience Component */}

              {/* Begin Experience Component */}
              <li className="entry">
                <div className="supertitle-3"><time dateTime="2018">2018</time> - <time dateTime="2238">2023</time></div>
                <h4 className="title-3">Front End Engineer</h4>
                <p className="subtitle-3">Company Name</p>
                <button className="btn-1" type="button">Javascript</button>
                <button className="btn-1" type="button">React</button>
                <button className="btn-1" type="button">Node</button>
              </li>
              {/* End Experience Component */}

              {/* Begin Experience Component */}
              <li className="entry">
                <div className="supertitle-3"><time dateTime="2018">2018</time> - <time dateTime="2238">2023</time></div>
                <h4 className="title-3">Front End Engineer</h4>
                <p className="subtitle-3">Company Name</p>
                <button className="btn-1" type="button">Javascript</button>
                <button className="btn-1" type="button">React</button>
                <button className="btn-1" type="button">Node</button>
              </li>
              {/* End Experience Component */}

            </ol>




          </section>


          <section className="section-contact indent-2">
            <h3 className="section-heading title-2">Contact</h3>

            {/* Begin ContactForm Component */}
            <form className="contact-form">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name"></input>

              <label htmlFor="email">Email</label>
              <input type="text" name="email" id="email"></input>

              <label htmlFor="subject">Subject</label>
              <input type="text" name="subject" id="subject"></input>

              <label htmlFor="message">Message</label>
              <textarea name="message" id="message"></textarea>

              <button className="btn-2" type="submit">Send</button>

            </form>
            {/* End ContactForm  Component */}

            <div className="sidebar-right">
              <p>Made with <img className="icon-sm" alt="love" src="/assets/icons/love-icon.png"></img> in Philadelphia </p>

              <a href="#">
                <img className="icon-lg" alt="Linkedin Icon" src="/assets/icons/linkedin-icon.png"></img>
                <span>LinkedIn</span>
              </a>

              <a href="#">
                <img className="icon-lg" alt="Github Icon" src="/assets/icons/github-icon.png"></img>
                <span>Github</span>
              </a>
            </div>

          </section>

          <section className="section-footer">
            <table>
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
                <td>6000 lines</td>
              </tr>
            </table>

            <a href="#">
              <button className="btn-2" type="button">Source</button>
            </a>
            <p>Code for this website is available for review on Github.  It took [time] to construct from start to finish.  Build with React, Vite, and sass. </p>
          </section>

        </div> {/* end content */}
      </div> {/* end page */}
    </>
  )
}

export default App
