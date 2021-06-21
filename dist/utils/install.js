"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const cross_spawn_1 = require("cross-spawn");
function default_1(useYarn, dependencies, root, exact = false) {
    let command, args;
    if (useYarn) {
        command = 'yarn';
        args = ['add'];
        if (exact)
            args.push('--exact');
        args.push(...dependencies, '--cwd', root);
    }
    else {
        command = 'npm';
        args = ['install', '--save'];
        if (exact)
            args.push('--save-exact');
        args.push('--loglevel', 'error', ...dependencies);
    }
    console.log();
    console.log(`use ${chalk_1.default.hex('#e91e63')(command)} install ${dependencies.map(val => chalk_1.default.hex('#29b6f6')(val)).join(',')}`);
    console.log();
    return cross_spawn_1.spawn(command, args, { 'stdio': 'inherit' });
}
exports.default = default_1;
