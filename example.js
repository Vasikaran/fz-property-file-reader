const propertyReader = require('./src/index');

var prop = propertyReader('./sample.property');

console.log(prop.get('name'));

console.log(prop.getAll());

console.log(prop.getRaw());

prop.set('age', 20);

prop.update('age', 40);

prop.push();


var prop = propertyReader('./sample.');
