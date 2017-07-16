Fz Property File Reader
=======================

This library using for access property file. You can read, write property file by using it.

## Installation

You can install the fz-property-file-reader from npm by running:

```sh
npm install --save fz-property-file-reader
```

## Usage

```js
var propertyReader = require('fz-property-file-reader');

var prop = propertyReader('sample.properties'); // for example
```

## Methods

### Get
`Params -  key `

`Params type - key : string`

`Return - value of your key`

```js
// Usage

prop.get(key);
```

If you pass the key to this method, it will returns the value to that key.

### Set

`Params - key, value`

`Params type - key : string, value : anything`

`Return - null`

```js
// Usage

prop.set(key, value);
```

Pass the key and value to this method, it will add your value with the key to properties file.

If your key already exists, it will throw `key already exists error`. At the time you will use update method instead of set. Because, you should not forget and change the existing keys.

### Update

`Params - key, value`

`Params type - key : string, value : anything`

`Return - null`

```js
// Usage

prop.update(key, value);
```

Pass the key and value to this method, it will update your value with the key to properties file.

If your key doesn't exists, it will throw `key doesn't exists error`. At the time you will use set method instead of update.

### Has

`Params - key`

`Params type - string`

`Return - ture or false`

`Return type - boolean`

```js
// Usage

prop.has(key);
```

Pass the key to this method, it will returns you key is there or not.

### GetAll

`Params - none`

`Params type - none`

`Return - properties file as object`

`Return type - object`

```js
// Usage

prop.getAll();
```

Just call this method, it will returns object of your properties file.

### GetKeys

`Params - none`

`Params type - none`

`Return - keys of your properties file`

`Return type - array`

```js
// Usage

prop.getKeys();
```

Just call this method, it will returns array that has your properties file's keys.

### Push

`Params - none`

`Params type - none`

`Return - nothing`

`Return type - none`

```js
// Usage

prop.push();
```

Push method used to push your changes to your properties file. Just call this method, it will push your changes to your properties file.

### GetRaw

`Params - none`

`Params type - none`

`Return - raw data of your properties file`

`Return type - string`

```js
// Usage

prop.getRaw();
```

Just call this method, it will returns your properties file without parse.

## Conclusion

If you find any errors in this, please let me know about it by using raise issue. 
