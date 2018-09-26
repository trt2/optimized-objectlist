import { assert, expect } from 'chai';

import * as OptimizedObjectList from '../src/OptimizedObjectList'; 

const test_optimized_data = {
    "columns": [ "id", "firstName", "lastName", "isActive" ],
    "data": [ [ 1, "John", "Doe", false ], [ 2, "Jane", "Doe", true ] ]
};

const test_unoptimized_data_columns = {
    id: 'TestId',
    firstName: 'TestFirstName',
    lastName: 'TestLastName',
    isActive: 'TestIsActive'
}

const test_unoptimized_data = [ 
    { 'id': 1, firstName: "John", lastName: "Doe", isActive: false }, 
    { 'id': 2, firstName: "Jane", lastName: "Doe", isActive: true }
];

describe("optimizedListToObjectList test", function() {
    describe("testing test_optimized_data", function() {
        it('convert from optimized data', function() {
            const res = OptimizedObjectList.optimizedListToObjectList(test_optimized_data);
            console.log(res);
            expect(res.length).to.equal(2);
            expect(res[0]).to.eql(test_unoptimized_data[0]);
            expect(res[1]).to.eql(test_unoptimized_data[1]);
        });
    });
});

describe("objectListToOptimizedList test", function() {
    describe("testing test_unoptimized_data_columns", function() {
        it('convert to optimized data', function() {
            const res = OptimizedObjectList.objectListToOptimizedList({data: test_unoptimized_data, columns: test_unoptimized_data_columns, columnKey: 'c', 'dataKey': 'd'});
            console.log(res);

            expect(res.c).to.eql(['TestId', 'TestFirstName', 'TestLastName', 'TestIsActive' ])
            expect(res.d.length).to.equal(2);
            expect(res.d[0]).to.eql([1, 'John', 'Doe', false]);
            expect(res.d[1]).to.eql([2, 'Jane', 'Doe', true]);
        });
    });
});
