var fsp = require('fs/promises');
const { marked } = require('marked');
const path = require('path');
const ymlToJson = require('js-yaml').load;

const writePath = './data/projects.json';
const sourcePath = './content/'

async function run() {
    const projectsData = {projects: []};
    const filenames = (await fsp.readdir(sourcePath)).filter((filename) => filename !== 'template.md');

    for (let i = 0; i < filenames.length; i++ ) {
        const fullFilePath = path.join(sourcePath, filenames[i]);
        const projectName = filenames[i].replace(/\.md/, '');
        const rawFileContents = await fsp.readFile(fullFilePath, "utf8");

        const [_, yml, markdown] = /```yml([\S\s]*)```([\S\s]*)$/.exec(rawFileContents);

        const newProject = ymlToJson(yml);
        if (newProject.detail) {
            newProject.detail = {
                ...newProject.detail,
                content: marked(markdown),
            }
        }

        projectsData.projects.push(newProject);
    }

    console.log(`Writing data to ${writePath} using ${filenames.length} files: \n${filenames.join('\n')}`)
    await fsp.writeFile(writePath, JSON.stringify(projectsData, null, 4));
  }

  run();