"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
function default_1(root, useTypescript) {
    console.log();
    console.log(`init ${chalk_1.default.green('eslint')}`);
    console.log();
    let config;
    const ignore = `/dist/*
/node_modules/*`;
    if (useTypescript) {
        config = {
            'env': {
                'browser': true,
                'commonjs': true,
                'node': true,
                'es6': true,
                'jest': true,
            },
            'parser': '@typescript-eslint/parser',
            'extends': [
                'eslint:recommended',
                'plugin:react/recommended',
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:@typescript-eslint/recommended',
            ],
            'parserOptions': {
                'sourceType': 'module',
                'ecmaVersion': 2020,
            },
            'rules': {},
        };
    }
    else {
        config = {
            'env': {
                'browser': true,
                'commonjs': true,
                'node': true,
                'es6': true,
                'jest': true,
            },
            'extends': [
                'eslint:recommended',
                'plugin:react/recommended',
            ],
            'parserOptions': {
                'sourceType': 'module',
                'ecmaVersion': 2020,
            },
            'rules': {},
        };
    }
    fs_extra_1.default.writeFileSync(path_1.default.join(root, '.eslintrc.json'), JSON.stringify(config, null, 2));
    fs_extra_1.default.writeFileSync(path_1.default.join(root, '.eslintignore'), ignore);
}
exports.default = default_1;
