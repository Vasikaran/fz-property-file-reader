const fs = require('fs');

class PropertyFileReader{
    constructor(filePath) {
        this.filePath = filePath;
        if (filePath.search('.properties') === -1){
            throw 'only .property file types allowed'
        }
        this.properties = {};
        this.parse();
    }

    parse(){
        var properties = this.readFile();
        if (properties.indexOf('\r') !== -1){
            this.splitBy = '\r';
            properties = properties.split(this.splitBy);
        }else if(properties.indexOf('\n') !== -1){
            this.splitBy = '\n';
            properties = properties.split(this.splitBy);
        }
        var count = 1;
        properties.forEach((property, index)=>{
            if (property.search('=') !== -1){
                property = property.replace(/ /g, '');
                let [ key, value ] = property.split('=');
                this.properties[key] = value;
            }else if(property === ''){
                this.properties['__empty' + index] = '';
            }else{
                if (this.properties[property] === ''){
                    this.properties[property + '__peoperty__reader' + count] = '';
                    count++;
                }else{
                    this.properties[property] = '';
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

    getAll(){
        let filterProperties = {};
        Object.keys(this.properties).forEach(property=>{
            let value = this.properties[property];
            if (value){
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
        this.properties[key] = value;
    }

    push(){
        let content = "";
        Object.keys(this.properties).forEach(key=>{
            if (key.search('__empty') === 0){
                content += this.splitBy;
            }else if(this.properties[key] === ''){
                if (key.search('__peoperty__reader') !== -1){
                    key = key.split('__peoperty__reader')[0];
                }
                content += key + this.splitBy;
            }else{
                content += key + '=' + this.properties[key] + this.splitBy;
            }
        })
        fs.writeFileSync(this.filePath, content, 'utf-8');
    }

    getKeys(){
        return Object.keys(this.properties);
    }
}

let propertyReader = (filePath)=>{
    return new PropertyFileReader(filePath);
}

module.exports = propertyReader;
