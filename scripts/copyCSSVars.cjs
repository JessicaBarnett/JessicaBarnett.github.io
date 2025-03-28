var fsp = require('fs/promises');

const cssColorsPath = './stylesheets/variables/_colors.scss';
const cssBreakpointsPath = './stylesheets/variables/_breakpoints.scss';
const cssRainbowPath = './stylesheets/variables/_rainbow.scss';

const jsSharedVarsPath = './data/css-variables.json';
const tsTypesPath = './src/types/css-variables-types.ts';

// returns tuple, [varName, varVal]
const parseVar = (line) => /\$(.*)\:\s(.*);/.exec(line).slice(1);

// returns boolean
const lineHasVar = (line) => /^\$.*:.*;$/.test(line);

// capitalize letter after dashes, and removes dashes
const formatForJs = (varName) => varName.replace(/-(.)/g, (_, c) => c.toUpperCase())

// capitalize 1st letter in word
const capitalize = (str) => str.replace(/^(.)/, (_, c) => c.toUpperCase());

//
const formatAsType = (str) => `Css${capitalize(str)}T`;


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

const typeFromObject = (obj, typeName, valueFn) => {
  const typeText = [];
  typeText.push(`export type ${typeName} = {`);
  Object.keys(obj).forEach((key) => {
    typeText.push(`    ${key}: ${valueFn(key)}`);
  });
  typeText.push(`};`);
  return [...typeText].join('\n');
}

function getTypesFileContent(sharedVars) {
  const subTypes = Object.keys(sharedVars).map((varGroup) => {
    return typeFromObject(sharedVars[varGroup], formatAsType(varGroup), () => 'string');
  });
  const primaryType = typeFromObject(sharedVars, 'CssVariablesT', (key) => `Css${capitalize(key)}T;`);
  return [...subTypes, primaryType].join('\n');
}

async function run() {
  const sharedVars = {};
  sharedVars.colors = await getSharedVariables(cssColorsPath);
  sharedVars.breakpoints = await getSharedVariables(cssBreakpointsPath);
  sharedVars.rainbow = await getSharedVariables(cssRainbowPath);

  console.log(`writing the following to ${jsSharedVarsPath}`);
  console.log(sharedVars)

  await fsp.writeFile(jsSharedVarsPath, JSON.stringify(sharedVars, null, 4))

  const typesFileContent = getTypesFileContent(sharedVars);
  console.log(`writing the following to ${tsTypesPath}`);
  console.log(typesFileContent)

  await fsp.writeFile(tsTypesPath, typesFileContent);
}

run();