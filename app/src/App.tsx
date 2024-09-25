import "./App.css"

function App() {

  return (
    <>

      <div className="title">
        <h1 className="h-title-1">Jessica Barnett</h1>
        <h2 className="h-title-2">Front-End / FullStack Software Engineer</h2>
      </div>




      <div className="about">
        <p className="h-deco-1">Hello.</p>
        <p className="h-deco-2">My name is Jessica and I make web things.</p>
        <p className="h-deco-3">Thanks for dropping by!</p>
      </div>



      <div className="projects">
        <h3 className="h-section-1">Projects</h3>
        <label htmlFor="filterProjects">Filter</label>
        <select name="filterProjects" id="filterProjects">
          <option selected>Filter</option>
          <option>Node</option>
          <option>Javascript</option>
          {/* populate with filters from project data */}
        </select>

        <h3 className="h-section-2">Company Name</h3>

        {/* Begin Project Component */}
        <div className="project-entry">
          <h4>Project Name</h4>
          <p>This is a block of text that describes the project.  It isn"t super long or detailed, but should give just enough information.</p>
          <button className="btn-1 filter-projects" type="button">Javascript</button>
          <button className="btn-1 filter-projects" type="button">React</button>
          <button className="btn-1 filter-projects" type="button">Node</button>
        </div>
        {/* End Project Component */}

      </div>





      <div className="resume">
        <h3 className="h-section-1">Resume</h3>

        {/* Begin Experience Component */}
        <div className="experience-entry">
          <time>2018</time> - <time>2023</time>
          <h4>Front End Engineer</h4>
          <p>Company Name</p>
          <button className="btn-1" type="button">Javascript</button>
          <button className="btn-1" type="button">React</button>
          <button className="btn-1" type="button">Node</button>
        </div>
        {/* End Experience Component */}

      </div>




      <div className="contact">
        <h3 className="h-section-1">Contact</h3>

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
          <p>Made with <i className='icon-sm'><img alt="love" src="./src/assets/icons/love-icon.png"></img></i> in Philadelphia </p>

          <a href="#">
            <i className='icon-lg'><img alt="Linkedin Icon" src="./src/assets/icons/linkedin-icon.png"></img></i>
            <p>LinkedIn</p>
          </a>

          <a href="#">
            <i className='icon-lg'><img alt="Github Icon" src="./src/assets/icons/github-icon.png"></img></i>
            <p>Github</p>
          </a>
        </div>

      </div>

      <div className="footer">
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
      </div>

    </>
  )
}

export default App
