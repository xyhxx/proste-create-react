
import {prompt, QuestionCollection} from 'inquirer';
import { canUseYarn, installDependencies } from './utils/index';
import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
import { spawn } from 'cross-spawn';
import {
  createFolders,
  installPlugin,
  installCraco,
  initTailwindCss,
  initEslint,
} from './dependencies/index';
import { exit } from 'process';

const cracoConfig:{[key:string]: any} = {};
// @types/react-router-dom @types/react-router-config @types/react-redux @types/lodash
// need config tailwindcss
const pluginsList = ' Eslint, TailwindCss, MobX, react-router-dom, react-router-config, redux, react-redux, @rematch/core, axios, Animate.css, lodash';
const questions:QuestionCollection[] = [
  {
    type: 'confirm',
    message: 'Use Typescript?',
    name: 'useTypescript',
  },
  {
    type: 'confirm',
    message: 'You want to create folders in advance?',
    name: 'usePresetFolder',
  },
  {
    type: 'checkbox',
    message: 'Choose the plug-in you need',
    name: 'plugins',
    choices: pluginsList.split(',').map(val => ({name: val})),
  },
];
const folderQuestion:QuestionCollection[] = [{
  message: 'Please enter the folder you need to create,use\',\'to separate, like(pages,utils,...).',
  type: 'input',
  default: 'pages,utils,functions,routes,assets,styles,controllers',
  name: 'files',
}];
let useTypescript:boolean, usePresetFolder:boolean, useYarn:boolean, plugins:string[], useExact:boolean = false;

const executeNodeScript = function(cwd:string, data:(string | boolean)[], source:string) {
  return new Promise(resolve => {
    const child = spawn(process.execPath, ['-e', source, '--', JSON.stringify(data)], {cwd, stdio: 'inherit'});

    child.on('close', resolve);
  });
};

const install = async function install(root:string, allDependencies:string[]):Promise<void> {
  return new Promise((resolve, reject) => {
    const child = installDependencies(useYarn, allDependencies, root, useExact);
    child.on('close', code => {
      if (code !== 0) {
        reject('react install error');
        return;
      }
      resolve();
    });
  });
};

const run = async function(root:string, name:string, originalPath:string) {
  let scriptName = 'react-scripts',
      templateName = useTypescript ? 'cra-template-typescript' : 'cra-template';
  const allDependencies = ['react', 'react-dom', scriptName, templateName];

  console.log('install packages...');
  await install(root, allDependencies);
  console.log();

  const data = [root, name, true, originalPath, templateName],
        source = `
          var init = require('react-scripts/scripts/init.js');
          init.apply(null, JSON.parse(process.argv[1]));
        `;
  await executeNodeScript(process.cwd(), data, source);
};

const createApp = async function(name: string) {
  const root = path.resolve(name);
  fs.ensureDirSync(root);

  console.log(`create project in ${chalk.green(root)}`);
  console.log();
  const projectPackage = {
    name,
    version: '0.1.0',
    private: true,
  };
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(projectPackage, null, 2),
  );

  const originalPath = process.cwd();
  process.chdir(root);

  await run(root, name, originalPath);
};

const init = async function(name:string, options: any) {
  useExact = options['useExact'] ?? false;
  try {
    let hadTailwind = false, hadEslint = false;
    useYarn = canUseYarn();
    const result = await prompt(questions);
    ({useTypescript, usePresetFolder, plugins} = result);
    hadTailwind = plugins.includes(' TailwindCss');
    hadEslint = plugins.includes(' Eslint');
    let files;
    if (usePresetFolder) {
      ({files} = await prompt(folderQuestion));
    }
    const root = path.resolve(name);

    await createApp(name);
    if (usePresetFolder && files) {
      console.log();
      console.log(`create folders(${chalk.green(files)}) in ${chalk.green(root.concat('\\src'))}`);
      createFolders(files, root);
      console.log();
    }
    if (plugins.length > 0) {
      await installPlugin(plugins, useTypescript, useYarn, root, useExact);
    }
    if (hadTailwind) {
      cracoConfig['style'] = {
        'postcss': {
          'plugins': [
            '${require(\'tailwindcss\')}',
            '${require(\'autoprefixer\')}',
          ],
        },
      };
      initTailwindCss(root);
    }
    if (hadEslint) {
      initEslint(root, useTypescript);
    }
    await installCraco(root, name, cracoConfig, useExact);
    const commandCli = useYarn ? 'yarn' : 'npm run';
    console.log();
    console.log(`
  Success! Created ${chalk.hex('#0097a7')(name)} at ${chalk.hex('#0097a7')(root)}
  Inside that directory, you can run several commands:

  ${chalk.hex('#0097a7')(commandCli)} start
  Starts the development server.

  ${chalk.hex('#0097a7')(commandCli)} build
  Bundles the app into static files for production.

  ${chalk.hex('#0097a7')(commandCli)} test
  Starts the test runner.

  ${chalk.hex('#0097a7')(commandCli)} eject
  Removes this tool and copies build dependencies, configuration files
  and scripts into the app directory. If you do this, you can’t go back!

  We suggest that you begin by typing:

  cd ${chalk.hex('#0097a7')(name)}
  ${chalk.hex('#0097a7')(commandCli)} start

  Happy hacking!
  `);
    console.log();
    exit(0);
  } catch (error) {
    console.error(error);

    exit(0);
  }
};

export {init};