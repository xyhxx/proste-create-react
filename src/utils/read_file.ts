import fs from 'fs-extra';

export default function(name:string, fileName:string):string {
  return fs.readFileSync(`${name}\\${fileName}`, {encoding: 'utf8'});
}