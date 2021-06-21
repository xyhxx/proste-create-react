"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const inquirer_1 = require("inquirer");
const index_1 = require("./utils/index");
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const chalk_1 = __importDefault(require("chalk"));
const cross_spawn_1 = require("cross-spawn");
const index_2 = require("./dependencies/index");
const process_1 = require("process");
const cracoConfig = {};
// @types/react-router-dom @types/react-router-config @types/react-redux @types/lodash
// need config tailwindcss
const pluginsList = ' Eslint, TailwindCss, MobX, react-router-dom, react-router-config, redux, react-redux, @rematch/core, axios, Animate.css, lodash';
const questions = [
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
        choices: pluginsList.split(',').map(val => ({ name: val })),
    },
];
const folderQuestion = [{
        message: 'Please enter the folder you need to create,use\',\'to separate, like(pages,utils,...).',
        type: 'input',
        default: 'pages,utils,functions,routes,assets,styles,controllers',
        name: 'files',
    }];
let useTypescript, usePresetFolder, useYarn, plugins, useExact = false;
const executeNodeScript = function (cwd, data, source) {
    return new Promise(resolve => {
        const child = cross_spawn_1.spawn(process.execPath, ['-e', source, '--', JSON.stringify(data)], { cwd, stdio: 'inherit' });
        child.on('close', resolve);
    });
};
const install = async function install(root, allDependencies) {
    return new Promise((resolve, reject) => {
        const child = index_1.installDependencies(useYarn, allDependencies, root, useExact);
        child.on('close', code => {
            if (code !== 0) {
                reject('react install error');
                return;
            }
            resolve();
        });
    });
};
const run = async function (root, name, originalPath) {
    let scriptName = 'react-scripts', templateName = useTypescript ? 'cra-template-typescript' : 'cra-template';
    const allDependencies = ['react', 'react-dom', scriptName, templateName];
    console.log('install packages...');
    await install(root, allDependencies);
    console.log();
    const data = [root, name, true, originalPath, templateName], source = `
          var init = require('react-scripts/scripts/init.js');
          init.apply(null, JSON.parse(process.argv[1]));
        `;
    await executeNodeScript(process.cwd(), data, source);
};
const createApp = async function (name) {
    const root = path_1.default.resolve(name);
    fs_extra_1.default.ensureDirSync(root);
    console.log(`create project in ${chalk_1.default.green(root)}`);
    console.log();
    const projectPackage = {
        name,
        version: '0.1.0',
        private: true,
    };
    fs_extra_1.default.writeFileSync(path_1.default.join(root, 'package.json'), JSON.stringify(projectPackage, null, 2));
    const originalPath = process.cwd();
    process.chdir(root);
    await run(root, name, originalPath);
};
const init = async function (name, options) {
    useExact = options['useExact'] ?? false;
    try {
        let hadTailwind = false, hadEslint = false;
        useYarn = index_1.canUseYarn();
        const result = await inquirer_1.prompt(questions);
        ({ useTypescript, usePresetFolder, plugins } = result);
        hadTailwind = plugins.includes(' TailwindCss');
        hadEslint = plugins.includes(' Eslint');
        let files;
        if (usePresetFolder) {
            ({ files } = await inquirer_1.prompt(folderQuestion));
        }
        const root = path_1.default.resolve(name);
        await createApp(name);
        if (usePresetFolder && files) {
            console.log();
            console.log(`create folders(${chalk_1.default.green(files)}) in ${chalk_1.default.green(root.concat('\\src'))}`);
            index_2.createFolders(files, root);
            console.log();
        }
        if (plugins.length > 0) {
            await index_2.installPlugin(plugins, useTypescript, useYarn, root, useExact);
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
            index_2.initTailwindCss(root);
        }
        if (hadEslint) {
            index_2.initEslint(root, useTypescript);
        }
        await index_2.installCraco(root, name, cracoConfig, useExact);
        const commandCli = useYarn ? 'yarn' : 'npm run';
        console.log();
        console.log(`
  Success! Created ${chalk_1.default.hex('#0097a7')(name)} at ${chalk_1.default.hex('#0097a7')(root)}
  Inside that directory, you can run several commands:

  ${chalk_1.default.hex('#0097a7')(commandCli)} start
  Starts the development server.

  ${chalk_1.default.hex('#0097a7')(commandCli)} build
  Bundles the app into static files for production.

  ${chalk_1.default.hex('#0097a7')(commandCli)} test
  Starts the test runner.

  ${chalk_1.default.hex('#0097a7')(commandCli)} eject
  Removes this tool and copies build dependencies, configuration files
  and scripts into the app directory. If you do this, you can’t go back!

  We suggest that you begin by typing:

  cd ${chalk_1.default.hex('#0097a7')(name)}
  ${chalk_1.default.hex('#0097a7')(commandCli)} start

  Happy hacking!
  `);
        console.log();
        process_1.exit(0);
    }
    catch (error) {
        console.error(error);
        process_1.exit(0);
    }
};
exports.init = init;
