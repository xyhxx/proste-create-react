import fs from 'fs-extra';
import chalk from 'chalk';
import path from 'path';

export default function(root: string) {
  console.log(`init ${chalk.green('tailwind.config.js')}`);

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
}