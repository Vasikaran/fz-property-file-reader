const fs = require('fs');

class PropertyFileReader{
    constructor(filePath) {
        this.filePath = filePath;
        if (filePath.search('.property') === -1){
            throw 'only .property file types allowed'
        }
        this.properties = {};
        this.parse();
    }

    parse(){
        var properties = this.readFile();
        properties = properties.replace(/ /g, '');
        properties = properties.split('\n');
        properties.forEach(property=>{
            if (property.split('=')[0] !== ''){
                let [ key, value ] = property.split('=');
                if (value.search('\r')){
                    value = value.split('\r')[0];
                }
                this.properties[key] = value;
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
        return this.properties;
    }

    set(key, value){
        if (this.properties[key]){
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
            content += key + '=' + this.properties[key] + '\n';
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
