'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var propertyToJsonParser = function propertyToJsonParser(propertyString) {
    var lines = propertyString.split('\n');
    var count = 1;
    var propertyObject = {};
    lines.forEach(function (line, index) {
        if (line.search('=') !== -1) {
            var _line$split = line.split('='),
                _line$split2 = _slicedToArray(_line$split, 2),
                key = _line$split2[0],
                value = _line$split2[1];

            key = key.replace(/\s+/g, '');
            value = value.trim();
            propertyObject[key] = value;
        } else if (line === '') {
            propertyObject['__empty' + index] = '__peoperty__reader';
        } else {
            if (propertyObject[line] === '__peoperty__reader') {
                propertyObject[line + '__peoperty__reader' + count] = '__peoperty__reader';
                count++;
            } else {
                propertyObject[line] = '__peoperty__reader';
            }
        }
    });
    return propertyObject;
};

module.exports = propertyToJsonParser;