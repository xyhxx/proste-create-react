import fs from 'fs-extra';

export default function(names:string, path:string) {
  const files = names.split(',').filter(val => val.length > 0);
  files.forEach(name => {
    fs.mkdirSync(`${path}\\src\\${name.trim()}`);
  });
}