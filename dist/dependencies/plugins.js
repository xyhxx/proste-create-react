"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const index_1 = require("../utils/index");
// @types/react-router-dom @types/react-router-config @types/react-redux @types/lodash
const needInstallTypes = ['react-router-dom', 'react-router-config', 'react-redux', 'lodash', 'tailwindcss'];
async function default_1(plguins, useTypescript, useYarn, root, useExact) {
    const list = plguins.map(val => val.trim().toLowerCase());
    const typeList = list.filter(val => needInstallTypes.includes(val)).map(val => `@types/${val}`);
    if (list.includes('eslint')) {
        list.push('eslint-plugin-react');
    }
    if (list.includes('tailwindcss')) {
        lodash_1.pull(list, 'tailwindcss');
        list.push(...['tailwindcss@npm:@tailwindcss/postcss7-compat', '@tailwindcss/postcss7-compat', 'postcss@^7', 'autoprefixer@^9']);
    }
    if (list.includes('mobx')) {
        list.push('mobx-react');
    }
    if (useTypescript) {
        if (list.includes('eslint')) {
            list.push('@typescript-eslint/eslint-plugin', '@typescript-eslint/parser');
        }
        list.push(...typeList);
    }
    const child = await index_1.installDependencies(useYarn, list, root, useExact);
    return new Promise((resolve, reject) => {
        child.on('close', code => {
            if (code !== 0) {
                reject('plugins install error');
                return;
            }
            resolve();
        });
    });
}
exports.default = default_1;
