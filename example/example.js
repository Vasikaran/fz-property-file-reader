const propertyReader = require('../lib/index');

var prop = propertyReader('./example.properties');

console.log(prop.get('name'));

console.log(prop.getAll());

console.log(prop.getRaw());

prop.update('age', 20);

prop.update('age', 40);

console.log(prop.has('age'), 'has');

console.log(prop.getKeys());

prop.update('name', 'karan');
prop.update('role', 'developer');
prop.push();
prop.set('age', 50); // throw error

var prop = propertyReader('./sample.');
