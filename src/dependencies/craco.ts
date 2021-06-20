import {canUseYarn, readFile, installDependencies} from '../utils/index';
import fs from 'fs-extra';
import chalk from 'chalk';

export default function(root:string, name:string, json: {}):Promise<void> {
  const useYarn = canUseYarn();
  const dependencies = '@craco/craco';

  return new Promise((resolve, reject) => {
    const child = installDependencies(useYarn, [dependencies], root);
    child.on('close', code => {
      if (code !== 0) {
        reject('craco install error');
        return;
      }
      console.log(`Configuring ${chalk.green('craco.config.js')}...`);

      let packageFile = readFile(name, 'package.json');
      packageFile = packageFile.replace(new RegExp('react-scripts ', 'g'), 'craco ');
      fs.writeFileSync(`${name}/package.json`, JSON.stringify(packageFile, null, 2));
      // fs.createFileSync(`${name}/craco.config.js`);
      fs.writeFileSync(`${name}/craco.config.js`, `module.exports=${JSON.stringify(json, null, 2)}`);
      resolve();
    });
  });
}