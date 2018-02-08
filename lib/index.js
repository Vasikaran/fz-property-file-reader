'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');
var propertyToJsonParser = require('./utils/propertyToJsonParser');

var PropertyFileReader = function () {
    function PropertyFileReader(filePath) {
        _classCallCheck(this, PropertyFileReader);

        this.filePath = filePath;
        if (filePath.search('.properties') === -1) {
            throw 'only .properties file types allowed';
        }
        this.properties = this.propertyToJsonParser(this.readFile(this.filePath));
    }

    _createClass(PropertyFileReader, [{
        key: 'getRaw',
        value: function getRaw() {
            return this.readFile();
        }
    }, {
        key: 'readFile',
        value: function readFile() {
            var file = fs.readFileSync(this.filePath, 'utf-8').toString();
            return file;
        }
    }, {
        key: 'get',
        value: function get(key) {
            return this.properties[key];
        }
    }, {
        key: 'remove',
        value: function remove(key) {
            if (this.has(key)) {
                delete this.properties[key];
            } else {
                var err = key + ' doesn"t exists';
                throw err;
            }
        }
    }, {
        key: 'getAll',
        value: function getAll() {
            var _this = this;

            var filterProperties = {};
            Object.keys(this.properties).forEach(function (property) {
                var value = _this.properties[property];
                if (value !== '__peoperty__reader') {
                    filterProperties[property] = value;
                }
            });
            return filterProperties;
        }
    }, {
        key: 'has',
        value: function has(key) {
            return this.properties[key] ? true : false;
        }
    }, {
        key: 'set',
        value: function set(key, value) {
            if (this.has(key)) {
                var err = key + ' already exists. if you want to update ' + key + ' use update method';
                throw err;
            }
            this.properties[key] = value;
        }
    }, {
        key: 'update',
        value: function update(key, value) {
            if (!this.has(key)) {
                var err = key + ' doesn"t exists. if you want to set ' + key + ' use set method';
                throw err;
            }
            this.properties[key] = value;
        }
    }, {
        key: 'push',
        value: function push() {
            var _this2 = this;

            var content = "";
            var keys = Object.keys(this.properties);
            keys.forEach(function (key, index) {
                if (key.search('__empty') === 0) {
                    // nothing
                } else if (_this2.properties[key] === '__peoperty__reader') {
                    if (key.search('__peoperty__reader') !== -1) {
                        key = key.split('__peoperty__reader')[0];
                    }
                    content += key;
                } else {
                    content += key + '=' + _this2.properties[key];
                }
                if (index !== keys.length - 1) {
                    content += '\n';
                }
            });
            fs.writeFileSync(this.filePath, content, 'utf-8');
        }
    }, {
        key: 'getKeys',
        value: function getKeys() {
            var _this3 = this;

            return Object.keys(this.properties).filter(function (key) {
                if (_this3.properties[key] !== '__peoperty__reader') {
                    return key;
                }
            });
        }
    }]);

    return PropertyFileReader;
}();

var propertyReader = function propertyReader(filePath) {
    return new PropertyFileReader(filePath);
};

module.exports = {
    propertyReader: propertyReader,
    propertyToJsonParser: propertyToJsonParser
};