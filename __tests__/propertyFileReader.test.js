import {propertyReader} from '../lib/index';
import path from 'path';
import fs from 'fs';

let nextLine = process.platform === 'win32' ? '\r\n' : '\n';
let testPropertyContent = 'name=Vasi' + nextLine + 'age=20' + nextLine;
fs.writeFileSync('./__tests__/sample.properties', testPropertyContent);

describe('property file reader tests', ()=>{
        let prop = propertyReader(path.resolve(__dirname, './sample.properties'));

        it('get method test', ()=>{
            let name = 'Vasi';
            expect(prop.get('name')).toEqual(name);
        })

        it('set method test', ()=>{
            let role = 'R and D';
            prop.set('role', role);
            expect(prop.get('role')).toEqual(role);
        })

        it('has method test', ()=>{
            expect(prop.has('name')).toBeTruthy();
        })

        it('update method test', ()=>{
            let name = 'Vasikaran';
            prop.update('name', name);
            expect(prop.get('name')).toEqual(name);
        })

        it('getKeys method test', ()=>{
            let keys = ['name', 'age', 'role'];
            expect(prop.getKeys()).toEqual(keys);
        })

        it('getAll method test', ()=>{
            let allObj = {
                name: 'Vasikaran',
                age: '20',
                role: 'R and D'
            }
            expect(prop.getAll()).toEqual(allObj);
        })

        it('remove method test', ()=>{
            let allObj = {
                name: 'Vasikaran',
                age: '20'
            }
            prop.remove('role');
            expect(prop.getAll()).toEqual(allObj);
        })

        it('getRaw method test', ()=>{
            let rawData = 'name=Vasi' + nextLine +'age=20' + nextLine;
            expect(prop.getRaw()).toEqual(rawData);
        })

        it('push method test', ()=>{
            let expetedObj = {
                name: 'Vasikaran',
                age: '20'
            }
            prop.push();
            let newProp = propertyReader(path.resolve(__dirname, './sample.properties'));
            expect(newProp.getAll()).toEqual(expetedObj);
        })

        it('replace old properties for testing', ()=>{
            let newProp = propertyReader(path.resolve(__dirname, './sample.properties'));
            let removedKeys = ['name', 'age'];
            removedKeys.forEach(key=>{
                newProp.remove(key);
            })

            newProp.set('name', 'Vasi');
            newProp.set('age', '20');
            newProp.push();
        })

})
