import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';
import docgen from "react-docgen-typescript";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(() => {
    const DIRECTORIES = [ 'tmpf', 'assets' ]
    const sampleComponent = `
        import React, { Component } from 'react';
        import { ButtonTypeMap } from '../../src/Button/ButtonProps';
    
        export class Button extends Component<ButtonTypeMap['props'], {}> {
            render() {
                return <div>Test</div>;
            }
        }
    `
    const __rootdir = resolvePath(__dirname, '../')
    const directories = readdirSync(resolvePath(__rootdir, 'src'))
    DIRECTORIES.forEach(dir => {
        if (!existsSync(resolvePath(__dirname, dir))) {
            mkdirSync(resolvePath(__dirname, dir));
            console.log("Directory created: ", resolvePath(__dirname, dir));
        } else {
            console.log("Directory already exists: ", resolvePath(__dirname, dir));
        }
    })
    directories.forEach(dir => {
        try {
            const files = readdirSync(resolvePath(__rootdir, 'src', dir))
            if (files.includes(`${dir}Props.ts`)) {
                const filepath = resolvePath(__dirname, 'tmpf', `${dir}.tsx`)
                writeFileSync(filepath, sampleComponent.replaceAll('Button', dir))
                const doc = docgen.parse(filepath)
                writeFileSync(resolvePath(__dirname, `assets/${dir}.json`), JSON.stringify(doc[0], null, 1))
            }
        } catch (error) {
            return null
        }
    })
})()