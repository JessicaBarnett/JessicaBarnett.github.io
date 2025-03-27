var fsp = require('fs/promises');
const path = require('path');
const ymlToJson = require('js-yaml').load;

const writePath = './data/projects-test.json';
const sourcePath = './content/'

async function run() {
    const projectsData = [];
    const filenames = (await fsp.readdir(sourcePath)).filter((filename) => filename !== 'template.md');

    for (let i = 0; i < filenames.length; i++ ) {
        const fullFilePath = path.join(sourcePath, filenames[i]);
        const projectName = filenames[i].replace(/\.md/, '');
        const rawFileContents = await fsp.readFile(fullFilePath, "utf8");

        const [_, yml, markdown] = /```yml([\S\s]*)```([\S\s]*)$/.exec(rawFileContents);

        projectsData.push({
            ...ymlToJson(yml),
            content: markdown // conversion to html + html purification is happening in browser
        });
    }

    console.log(`Writing data to ${writePath} using ${filenames.length} files: ${filenames.join(', ')}`)
    await fsp.writeFile(writePath, JSON.stringify(projectsData, null, 4));
  }

  run();