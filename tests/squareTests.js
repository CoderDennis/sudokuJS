module("Square");

test("ValueChanged CallbackReceivesValues", function () {
    var testSquare = new sudoku.Square();
    var oldValue;
    var newValue;
    testSquare.onValueChanged(function (sq, oldVal, value) {
        strictEqual(sq, testSquare, "callback sender should equal testSquare");
        oldValue = oldVal;
        newValue = value;
    });
    testSquare.value(sudoku.values.five);
    equal(oldValue, sudoku.values.empty, "old value should be empty");
    equal(newValue, sudoku.values.five, "new value should be five");
    testSquare.value(sudoku.values.eight);
    equal(oldValue, sudoku.values.five, "old value should be five");
    equal(newValue, sudoku.values.eight, "new value should be eight");
});