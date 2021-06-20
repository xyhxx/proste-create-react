import path from 'path';

export default function(name:string):string {
  return path.resolve(name);
}