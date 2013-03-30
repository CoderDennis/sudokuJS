test("PossibleValues new ContainsValuesOneToNine", function () {
    var testValues = new sudoku.PossibleValues();
    deepEqual(testValues.values(), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test("PossibleValues ManuallyRemovedValue DoesNotGetAdded", function () {
    var testValues = new sudoku.PossibleValues();
    testValues.manuallyRemove(sudoku.values.five);
    deepEqual(testValues.values(), [1, 2, 3, 4, 6, 7, 8, 9], "value five should have been removed.");
    testValues.add(sudoku.values.five);
    deepEqual(testValues.values(), [1, 2, 3, 4, 6, 7, 8, 9], "value five should *NOT* have been added.");
});

test("PossibleValues ManuallyRemovedAndAddedValue DoesGetAdded", function () {
    var testValues = new sudoku.PossibleValues();
    testValues.manuallyRemove(sudoku.values.five);
    deepEqual(testValues.values(), [1, 2, 3, 4, 6, 7, 8, 9], "value five should have been removed.");
    testValues.manuallyAdd(sudoku.values.five);
    deepEqual(testValues.values(), [1, 2, 3, 4, 5, 6, 7, 8, 9], "value five should have been added.");
});
