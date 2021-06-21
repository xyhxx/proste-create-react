import chalk from 'chalk';
import {spawn} from 'cross-spawn';

export default function(useYarn:boolean, dependencies:string[], root: string, exact:boolean = false) {
  let command:string, args:string[];
  if (useYarn) {
    command = 'yarn';
    args = ['add'];
    if (exact) args.push('--exact');
    args.push(...dependencies, '--cwd', root);
  } else {
    command = 'npm';
    args = ['install', '--save'];
    if (exact) args.push('--save-exact');
    args.push('--loglevel', 'error', ...dependencies);
  }
  console.log();
  console.log(`use ${chalk.hex('#e91e63')(command)} install ${dependencies.map(val => chalk.hex('#29b6f6')(val)).join(',')}`);
  console.log();

  return spawn(command, args, {'stdio': 'inherit'});
}