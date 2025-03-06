#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import path from 'node:path';
import parse from './parser.js';

const buildFullPath = (filePath) => path.resolve(process.cwd(), filePath);

const genDiff = (path1, path2) => {
  const fullPath1 = buildFullPath(path1);
  const fullPath2 = buildFullPath(path2);

  const data1 = readFileSync(fullPath1, 'utf-8');
  const data2 = readFileSync(fullPath2, 'utf-8');

  const [parsedObj1, parsedObj2] = parse(data1, data2);

  return [parsedObj1, parsedObj2];
};

export default genDiff;