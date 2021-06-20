"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const cross_spawn_1 = require("cross-spawn");
function default_1(useYarn, dependencies, root) {
    let command, args;
    if (useYarn) {
        command = 'yarn';
        args = ['add', '--exact', ...dependencies, '--cwd', root];
    }
    else {
        command = 'npm';
        args = ['install', '--save', '--save-exact', '--loglevel', 'error', ...dependencies];
    }
    console.log(`use ${chalk_1.default.green(command)} install ${dependencies.map(val => chalk_1.default.green(val)).join(',')}`);
    return cross_spawn_1.spawn(command, args, { 'stdio': 'inherit' });
}
exports.default = default_1;
