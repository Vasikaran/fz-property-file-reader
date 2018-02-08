let propertyToJsonParser = (propertyString)=>{
    let lines = propertyString.split('\n');
    let count = 1;
    let propertyObject = {};
    lines.forEach((line, index)=>{
        if (line.search('=') !== -1){
            let [ key, value ] = line.split('=');
            key = key.replace(/\s+/g, '');
            value = value.trim();
            propertyObject[key] = value;
        }else if(line === ''){
            propertyObject['__empty' + index] = '__peoperty__reader';
        }else{
            if (propertyObject[line] === '__peoperty__reader'){
                propertyObject[line + '__peoperty__reader' + count] = '__peoperty__reader';
                count++;
            }else{
                propertyObject[line] = '__peoperty__reader';
            }
        }
    })
    return propertyObject;
}

module.exports = propertyToJsonParser;
