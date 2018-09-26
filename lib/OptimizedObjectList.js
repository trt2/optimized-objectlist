'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Convert an "optimized" list of json objects to proper json objects.
 * 
 * Input:
 * {
 *     "Columns": [ "id", "firstName", "lastName", "isActive" ],
 *     "Data": [ [ 1, "John", "Doe", false ], [ 2, "Jane", "Doe", true ] ]
 * }
 * 
 * Output: 
 * [
 *     { "id": 1, "firstName": "John", "lastName": "Doe", "isActive": false },
 *     { "id": 2, "firstName": "Jane", "lastName": "Doe", "isActive": true }
 * ]  
 *  
 */
function optimizedListToObjectList(dataObj, columnKey, dataKey) {
    columnKey = columnKey || 'columns';
    dataKey = dataKey || 'data';

    if (!(columnKey in dataObj) || !(dataKey in dataObj)) {
        return null;
    }

    var cols = dataObj[columnKey];
    var data = dataObj[dataKey];

    var res = [];

    for (var i = 0; i < data.length; i++) {
        var row = data[i];
        var o = {};
        for (var j = 0; j < row.length; j++) {
            o[cols[j]] = row[j];
        }
        res.push(o);
    }

    return res;
}

/**
 * objectListToOptimizedList({data: someData, columns: {'objectKey': 'columnName', 'objectKey2': 'columnName2'}, columnKey: 'columns', dataKey: 'data' })
 * 
 */
function objectListToOptimizedList() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        data = _ref.data,
        columns = _ref.columns,
        columnKey = _ref.columnKey,
        dataKey = _ref.dataKey;

    columnKey = columnKey || 'columns';
    dataKey = dataKey || 'data';

    var keys = Object.keys(columns);
    if (keys.length === 0) {
        return null;
    }

    var outColumns = keys.map(function (item) {
        return columns[item];
    });
    var outData = void 0;

    if (data && data.length > 0) {
        outData = data.map(function (item) {
            var dataList = [];
            for (var i = 0; i < keys.length; i++) {
                dataList.push(item[keys[i]]);
            }
            return dataList;
        });
    }

    var ret = {};
    ret[columnKey] = outColumns;
    ret[dataKey] = outData || [];

    return ret;
}

exports.optimizedListToObjectList = optimizedListToObjectList;
exports.objectListToOptimizedList = objectListToOptimizedList;