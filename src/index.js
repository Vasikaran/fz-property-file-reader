const fs = require('fs');

class PropertyFileReader{
    constructor(filePath) {
        this.filePath = filePath;
        if (filePath.search('.properties') === -1){
            throw 'only .properties file types allowed'
        }
        this.properties = {};
        this.propertyToJsonParser();
    }

    propertyToJsonParser(){
        let file = this.readFile();
        let lines = file.split('\n');
        let count = 1;
        lines.forEach((line, index)=>{
            if (line.search('=') !== -1){
                line = line.replace(/ /g, '');
                let [ key, value ] = line.split('=');
                this.properties[key] = value ;
            }else if(line === ''){
                this.properties['__empty' + index] = '__peoperty__reader';
            }else{
                if (this.properties[line] === '__peoperty__reader'){
                    this.properties[line + '__peoperty__reader' + count] = '__peoperty__reader';
                    count++;
                }else{
                    this.properties[line] = '__peoperty__reader';
                }
            }
        })
    }

    getRaw(){
        return this.readFile();
    }

    readFile(){
        let file = fs.readFileSync(this.filePath, 'utf-8').toString();
        return file;
    }

    get(key){
        return this.properties[key];
    }

    remove(key){
        if(this.has(key)){
            delete this.properties[key]
        }else{
            let err = key + ' doesn"t exists';
            throw err;
        }
    }

    getAll(){
        let filterProperties = {};
        Object.keys(this.properties).forEach(property=>{
            let value = this.properties[property];
            if (value !== '__peoperty__reader'){
                filterProperties[property] = value
            }
        })
        return filterProperties;
    }

    has(key){
        return this.properties[key] ? true : false;
    }

    set(key, value){
        if (this.has(key)){
            let err = key + ' already exists. if you want to update ' + key + ' use update method';
            throw err;
        }
        this.properties[key] = value;
    }

    update(key, value){
        if (!this.has(key)){
            let err = key + ' doesn"t exists. if you want to set ' + key + ' use set method';
            throw err;
        }
        this.properties[key] = value;
    }

    push(){
        let content = "";
        let keys = Object.keys(this.properties);
        keys.forEach((key, index)=>{
            if (key.search('__empty') === 0){
                // nothing
            }else if(this.properties[key] === '__peoperty__reader'){
                if (key.search('__peoperty__reader') !== -1){
                    key = key.split('__peoperty__reader')[0];
                }
                content += key;
            }else{
                content += key + '=' + this.properties[key];
            }
            if (index !== keys.length - 1) {
                content += '\n';
            }
        })
        fs.writeFileSync(this.filePath, content, 'utf-8');
    }

    getKeys(){
        return Object.keys(this.properties).filter(key=>{
            if (this.properties[key] !== '__peoperty__reader'){
                return key;
            }
        });
    }
}

let propertyReader = (filePath)=>{
    return new PropertyFileReader(filePath);
}

module.exports = propertyReader;
