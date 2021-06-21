import {canUseYarn, readFile, installDependencies} from '../utils/index';
import fs from 'fs-extra';
import chalk from 'chalk';

export default function(root:string, name:string, json:{}, useExact:boolean):Promise<void> {
  const useYarn = canUseYarn();
  const dependencies = '@craco/craco';

  return new Promise((resolve, reject) => {
    const child = installDependencies(useYarn, [dependencies], root, useExact);
    child.on('close', code => {
      if (code !== 0) {
        reject('craco install error');
        return;
      }
      console.log();
      console.log(`Configuring ${chalk.green('craco.config.js')}...`);
      console.log();
      let packageFile = readFile(root, 'package.json');
      packageFile = packageFile.replace(new RegExp('react-scripts (?!eject)', 'g'), 'craco ');
      fs.writeFileSync(`${root}/package.json`, packageFile);
      fs.writeFileSync(`${root}/craco.config.js`, `module.exports = ${JSON.stringify(json, null, 2).replace(/"\$\{(.+)\}"/g, '$1')}`);
      resolve();
    });
  });
}