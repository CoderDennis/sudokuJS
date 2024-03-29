module("PossibleValues");

test("new ContainsValuesOneToNine", function () {
    var testValues = new sudoku.PossibleValues();
    var testValues2 = new sudoku.PossibleValues(); // make sure each PossibleValues object is holding its own list.
    testValues2.fromArray([]);
    deepEqual(testValues.values(), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test("ManuallyRemovedValue DoesNotGetAdded", function () {
    var testValues = new sudoku.PossibleValues();
    testValues.manuallyRemove(sudoku.values.five);
    deepEqual(testValues.values(), [1, 2, 3, 4, 6, 7, 8, 9], "value five should have been removed.");
    testValues.add(sudoku.values.five);
    deepEqual(testValues.values(), [1, 2, 3, 4, 6, 7, 8, 9], "value five should *NOT* have been added.");
});

test("ManuallyRemovedAndAddedValue DoesGetAdded", function () {
    var testValues = new sudoku.PossibleValues();
    testValues.manuallyRemove(sudoku.values.five);
    deepEqual(testValues.values(), [1, 2, 3, 4, 6, 7, 8, 9], "value five should have been removed.");
    testValues.manuallyAdd(sudoku.values.five);
    deepEqual(testValues.values(), [1, 2, 3, 4, 5, 6, 7, 8, 9], "value five should have been added.");
});

test("fromArray DoesNotAddManuallyRemovedValues", function() {
    var testValues = new sudoku.PossibleValues();
    testValues.manuallyRemove(sudoku.values.five);
    testValues.manuallyRemove(sudoku.values.one);
    testValues.fromArray([1, 3, 5, 7, 9]);
    deepEqual(testValues.values(), [3, 7, 9], "one and five should not be added");
});
