import { pull } from 'lodash';
import { installDependencies } from '../utils/index';

// @types/react-router-dom @types/react-router-config @types/react-redux @types/lodash
const needInstallTypes = ['react-router-dom', 'react-router-config', 'react-redux', 'lodash'];

export default async function(plguins:string[], useTypescript:boolean, useYarn:boolean, root:string):Promise<void> {
  const list = plguins.map(val => val.trim().toLowerCase());
  const typeList = list.filter(val => needInstallTypes.includes(val)).map(val => `@types/${val}`);

  if (list.includes('eslint')) {
    list.push('eslint-plugin-react');
  }

  if (list.includes('tailwindcss')) {
    pull(list, 'tailwindcss');
    list.push(...['tailwindcss@npm:@tailwindcss/postcss7-compat', '@tailwindcss/postcss7-compat', 'postcss@^7', 'autoprefixer@^9']);
  }

  if (list.includes('mobx')) {
    list.push('mobx-react');
  }

  if (useTypescript) {
    if (list.includes('eslint')) {
      list.push(...['@typescript-eslint/eslint-plugin', '@typescript-eslint/parser']);
    }
    list.push(...typeList);
  }

  const child = await installDependencies(useYarn, list, root);

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