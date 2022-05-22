import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(() => {
    const __rootdir = resolve(__dirname, '../')
    const pkgFilePath = resolve(__rootdir, 'package.json')
    const pkgString = readFileSync(pkgFilePath).toString('utf-8')
    const {
        type,
        scripts,
        devDependencies,
        files,
        'lint-staged': lintStaged,
        ...pkg
    } = JSON.parse(pkgString)
    pkg.main = pkg.module = './index.js'
    pkg.types = './index.d.ts'
    const buildPkgPath = resolve(__rootdir, 'build/package.json')
    writeFileSync(
        buildPkgPath,
        JSON.stringify(pkg, null, 2),
        {
            encoding: 'utf-8',            
        }
    )
})()