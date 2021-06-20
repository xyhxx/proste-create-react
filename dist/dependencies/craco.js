"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../utils/index");
const fs_extra_1 = __importDefault(require("fs-extra"));
const chalk_1 = __importDefault(require("chalk"));
function default_1(root, name, json) {
    const useYarn = index_1.canUseYarn();
    const dependencies = '@craco/craco';
    return new Promise((resolve, reject) => {
        const child = index_1.installDependencies(useYarn, [dependencies], root);
        child.on('close', code => {
            if (code !== 0) {
                reject('craco install error');
                return;
            }
            console.log(`Configuring ${chalk_1.default.green('craco.config.js')}...`);
            let packageFile = index_1.readFile(name, 'package.json');
            packageFile = packageFile.replace(new RegExp('react-scripts ', 'g'), 'craco ');
            fs_extra_1.default.writeFileSync(`${name}/package.json`, JSON.stringify(packageFile, null, 2));
            // fs.createFileSync(`${name}/craco.config.js`);
            fs_extra_1.default.writeFileSync(`${name}/craco.config.js`, `module.exports=${JSON.stringify(json, null, 2)}`);
            resolve();
        });
    });
}
exports.default = default_1;
