# Optimized Object List

Utility functions for converting javascript objects to and from a list of values.
This is used to optimize the datasize required for sending many objects when other compression methods are not available.

## Usage

Convert from object array to optimized object list:
```
import { objectListToOptimizedList } from '@trt2/optimized-objectlist';

const objArray = [
    { "id": 1, "firstName": "John", "lastName": "Doe", "isActive": false },
    { "id": 2, "firstName": "Jane", "lastName": "Doe", "isActive": true }
] 

const res = objectListToOptimizedList({
    data: objArray,
    columns: {
            id: "id",       // map key "id" to column "id" in output
            firstName: "firstName",
            lastName: "lastName",
            isActive: "isActive"
        }
    });

/* 
    res = {
        "columns": [ "id", "firstName", "lastName", "isActive" ],
        "data": [ [ 1, "John", "Doe", false ], [ 2, "Jane", "Doe", true ] ]
    }
*/   
```

Convert from optimized object list to object list:

```
import { optimizedListToObjectList } from '@trt2/optimized-objectlist';

const optObjList = {
    "columns": [ "id", "firstName", "lastName", "isActive" ],
    "data": [ [ 1, "John", "Doe", false ], [ 2, "Jane", "Doe", true ] ]
}

const res = optimizedListToObjectList(optObjList);

/*
    res = [
        { "id": 1, "firstName": "John", "lastName": "Doe", "isActive": false },
        { "id": 2, "firstName": "Jane", "lastName": "Doe", "isActive": true }
    ]  
*/
```

## Function Parameters

`function optimizedListToObjectList(dataObj, columnKey, dataKey)`
- dataObj - Optimized object to process
- columnKey - Name of key in dataObj containing array of columns (default: 'columns')
- dataKey - Name of key in dataObj containing data (default: 'data')

`function objectListToOptimizedList({data, columns, columnKey, dataKey} = {})`
- data - List of objects to convert to optimized object list
- columns - Object where keys are the keys in objects to optimize and the value is the name the column will be given in the output
- columnKey - The object key containing the column array (default: 'columns')
- dataKey - The object key containing the optimized object data (default: 'data')