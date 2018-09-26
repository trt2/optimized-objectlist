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
    
    if(!(columnKey in dataObj) || !(dataKey in dataObj)) {
        return null;
    }
    
    let cols = dataObj[columnKey];
    let data = dataObj[dataKey];

    let res = [];

    for(let i=0;i<data.length;i++) {
        let row = data[i];
        let o = {};
        for(let j=0;j<row.length;j++) {
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
function objectListToOptimizedList({data, columns, columnKey, dataKey} = {}) {
    columnKey = columnKey || 'columns';
    dataKey = dataKey || 'data';

    const keys = Object.keys(columns);
    if(keys.length === 0) {
        return null;
    }

    const outColumns = keys.map((item) => columns[item]);
    let outData;

    if(data && data.length > 0) {
        outData = data.map((item) => {
            let dataList = [];
            for(let i=0;i<keys.length;i++) {
                dataList.push(item[keys[i]]);
            }
            return dataList;
        });
    }
    
    let ret = {};
    ret[columnKey] = outColumns;
    ret[dataKey] = outData || [];

    return ret;
}

export { optimizedListToObjectList, objectListToOptimizedList };