import fs from 'fs';
import path from 'node:path';
import _ from 'lodash';

const buildFullPath = (filepath) => path.resolve(process.cwd(), filepath);

const gendiff = (path1, path2) => {
  const absolute1 = buildFullPath(path1);
  const absolute2 = buildFullPath(path2);
  const data1 = JSON.parse(fs.readFileSync(absolute1, 'utf-8'));
  const data2 = JSON.parse(fs.readFileSync(absolute2, 'utf-8'));

  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const sortedKeys = _.union(keys1, keys2).sort();

  const diff = sortedKeys.reduce((acc, key) => {
    if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
      acc.push(` - ${key}: ${data1[key]}`);
    } else if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      acc.push(` + ${key}: ${data2[key]}`);
    } else if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      if (data1[key] === data2[key]) {
        acc.push(`   ${key}: ${data2[key]}`);
      } else if (data1[key] !== data2[key]) {
        acc.push(` - ${key}: ${data1[key]}`);
        acc.push(` + ${key}: ${data2[key]}`);
      }
    }
    return acc;
  }, ['{']);
  diff.push('}');
  const result = diff.join('\n');
  console.log(result);
};

export default gendiff;
