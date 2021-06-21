"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../utils/index");
const fs_extra_1 = __importDefault(require("fs-extra"));
const chalk_1 = __importDefault(require("chalk"));
function default_1(root, name, json, useExact) {
    const useYarn = index_1.canUseYarn();
    const dependencies = '@craco/craco';
    return new Promise((resolve, reject) => {
        const child = index_1.installDependencies(useYarn, [dependencies], root, useExact);
        child.on('close', code => {
            if (code !== 0) {
                reject('craco install error');
                return;
            }
            console.log();
            console.log(`Configuring ${chalk_1.default.green('craco.config.js')}...`);
            console.log();
            let packageFile = index_1.readFile(root, 'package.json');
            packageFile = packageFile.replace(new RegExp('react-scripts (?!eject)', 'g'), 'craco ');
            fs_extra_1.default.writeFileSync(`${root}/package.json`, packageFile);
            fs_extra_1.default.writeFileSync(`${root}/craco.config.js`, `module.exports = ${JSON.stringify(json, null, 2).replace(/"\$\{(.+)\}"/g, '$1')}`);
            resolve();
        });
    });
}
exports.default = default_1;
