import fs from 'fs-extra';
import chalk from 'chalk';
import path from 'path';

export default function(root: string) {
  console.log();
  console.log(`init ${chalk.green('tailwind.config.js')}`);
  console.log();

  const config = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [],
  };

  fs.writeFileSync(
    path.join(root, 'tailwind.config.js'),
    `module.exports=${JSON.stringify(config, null, 2)}`,
  );

  console.log();
  console.log(`rewrite ${chalk.green('index.css')} to support ${chalk.green('tailwindcss')}`);
  console.log();

  let initCss = fs.readFileSync(
    path.join(root, 'src', 'index.css'),
    {'encoding': 'utf8'},
  );

  initCss = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n${initCss}`;

  fs.writeFileSync(path.join(root, 'src', 'index.css'), initCss);
}