import fs from 'fs';
import path from 'node:path';

const buildFullPath = (filepath) => path.resolve(process.cwd(), filepath);

const genDiff = (path1, path2) => {
    const absolute1 = buildFullPath(path1);
    const aboslute2 = buildFullPath(path2);
    const data1 = fs.readFileSync(absolute1, 'utf-8');
    const data2 = fs.readFileSync(aboslute2, 'utf-8');
    console.log(data1, data2);
};

export default genDiff;
