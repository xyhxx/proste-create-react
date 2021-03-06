"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
function default_1(root) {
    console.log();
    console.log(`init ${chalk_1.default.green('tailwind.config.js')}`);
    console.log();
    const config = {
        purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
        darkMode: false,
        theme: {
            extend: {},
        },
        variants: {
            extend: {},
        },
        plugins: [],
    };
    fs_extra_1.default.writeFileSync(path_1.default.join(root, 'tailwind.config.js'), `module.exports=${JSON.stringify(config, null, 2)}`);
    console.log();
    console.log(`rewrite ${chalk_1.default.green('index.css')} to support ${chalk_1.default.green('tailwindcss')}`);
    console.log();
    let initCss = fs_extra_1.default.readFileSync(path_1.default.join(root, 'src', 'index.css'), { 'encoding': 'utf8' });
    initCss = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n${initCss}`;
    fs_extra_1.default.writeFileSync(path_1.default.join(root, 'src', 'index.css'), initCss);
}
exports.default = default_1;
