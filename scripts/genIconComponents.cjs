var fsp = require('fs/promises');
const path = require('path');

const componentsPath = './src/icons';
const svgFilesPath = './public/assets/icons';

async function deleteOldFiles(componentsPath) {
  try {
    const filenames = await fsp.readdir(componentsPath);
    console.log(`deleting existing components: \n${filenames.join('\n')}\n\n` )

    const deleteFilePromises = filenames.map(filename =>
      fsp.unlink(path.join(componentsPath, filename)),
    );

    await Promise.all(deleteFilePromises);
  } catch (err) {
    console.log(err);
  }
}

async function createNewFiles(svgFilesPath, componentsPath) {
  try {
    const svgFilenames = (await fsp.readdir(svgFilesPath)).filter(filename => /.*\.svg$/.test(filename));
    console.log(`creating components for: \n${svgFilenames.join('\n')}\n\n` )

    const writeFilePromises = svgFilenames.map(async svgFilename => {
      const svgIconFullPath = path.join(svgFilesPath, svgFilename);
      const svgIconName = svgFilename.slice(0, -4);

      const componentName = svgIconName
        .replace(/^(.{1})/, (s) => s.toUpperCase()) // uppercase
        .replaceAll(/(-.{1})/g, s => s.charAt(1).toUpperCase())// uppercase + no hyphens
        .concat('Icon'); // add the word "Icon" at the end
      const componentFileName = path.join(componentsPath, componentName+'.tsx');

      const svgContent = await fsp.readFile(svgIconFullPath, "utf8");

      fsp.writeFile(componentFileName, `
// This component was Generated via the generateIconComponents.cjs script
export const ${componentName} = () => {
    return (
    <span className="icon icon-${svgIconName}">
${svgContent}
    </span>
    );
}`)
    })

    await Promise.all(writeFilePromises);
  } catch (err) {
    console.log(err);
  }
}

async function createManifest(componentsPath) {
  try {
    console.log(`rewriting manifest` )
    const manifestPath = path.join(componentsPath, 'icons-manifest.json');
    const componentFileNames = (await fsp.readdir(componentsPath)).filter(filename => /.*\.tsx$/.test(filename));
    const format = (compName) => `"${compName.slice(0, -4)}"`;

    await fsp.writeFile(manifestPath, `{ "icons": [${componentFileNames.map(format)}] }`);
  } catch (err) {
    console.log(err);
  }
}

async function run () {
  await deleteOldFiles(componentsPath)
  await createNewFiles(svgFilesPath, componentsPath)
  await createManifest(componentsPath)
}

run();