var fsp = require('fs/promises');
const path = require('path');

const cssColorsPath = './stylesheets/variables/_colors.scss';
const cssBreakpointsPath = './stylesheets/variables/_breakpoints.scss';

const jsSharedVarsPath = './src/css-variables.json';

// returns tuple, [varName, varVal]
const parseVar = (line) => /\$(.*)\:\s(.*);/.exec(line).slice(1);

// returns boolean
const lineHasVar = (line) => /^\$.*:.*;$/.test(line);

// capitalize letter after dashes, and removes dashes
const formatForJs = (varName) => varName.replace(/-(.)/g, (_, c) => c.toUpperCase())

// returns object with variable names as keys
async function getSharedVariables(cssPath) {
  try {
    const fileContents = await fsp.readFile(cssPath, 'utf-8');

    return fileContents.split('\n').reduce((result, line) => {
      if (lineHasVar(line)) {
        const [varName, varVal] = parseVar(line);
        result[formatForJs(varName)] = varVal;
      }
      return result;
    }, {})
  }
  catch (err) {
    console.log(err);
  }
}

async function run() {
  const sharedVars = {};

  sharedVars.colors = await getSharedVariables(cssColorsPath);
  sharedVars.breakpoints = await getSharedVariables(cssBreakpointsPath);

  console.log(`writing the following to ${jsSharedVarsPath}`);
  console.log(sharedVars)

  await fsp.writeFile(jsSharedVarsPath, JSON.stringify(sharedVars, null, 4))
}

run();