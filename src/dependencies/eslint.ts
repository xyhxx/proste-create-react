import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

export default function(root:string, useTypescript:boolean) {
  console.log(`init ${chalk.green('eslint')}`);

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
  } else {
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

  fs.writeFileSync(
    path.join(root, '.esling.json'),
    JSON.stringify(config, null, 2),
  );
  fs.writeFileSync(
    path.join(root, '.eslintignore'),
    ignore,
  );
}