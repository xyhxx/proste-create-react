import chalk from 'chalk';
import {spawn} from 'cross-spawn';

export default function(useYarn:boolean, dependencies:string[], root: string) {
  let command:string, args:string[];
  if (useYarn) {
    command = 'yarn';
    args = ['add', '--exact', ...dependencies, '--cwd', root];
  } else {
    command = 'npm';
    args = ['install', '--save', '--save-exact', '--loglevel', 'error', ...dependencies];
  }

  console.log(`use ${chalk.green(command)} install ${dependencies.map(val => chalk.green(val)).join(',')}`);

  return spawn(command, args, {'stdio': 'inherit'});
}