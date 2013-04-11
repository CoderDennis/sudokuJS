module("Puzzle");

var getHorizontalPuzzle = function() {
    var result = new sudoku.Puzzle();
    for (var i = 0; i <= 8; i++) {
        for (var j = 0; j <= 8; j++) {
            var s = (i * 9) + j;
            result.squares(s).value(i + 1);
        }
    }
    return result;
};

var getVerticalPuzzle = function() {
    var result = new sudoku.Puzzle();
    for (var i = 0; i <= 8; i++) {
        for (var j = 0; j <= 8; j++) {
            var s = (i * 9) + j;
            result.squares(s).value(j + 1);
        }
    }
    return result;
};

var displayString = function(list) {
    var result = "";
    _.each(list, function(squares) {
        _.each(squares, function(sq) {
            result += sq.value();
        });
        result += "\r\n";
    });
    return result;
};

asyncTest("Aprroval Test", function () {
    var testValue = "111222333\r\n" +
                    "444555666\r\n" +
                    "777888999\r\n" +
                    "111222333\r\n" +
                    "444555666\r\n" +
                    "777888999\r\n" +
                    "111222333\r\n" +
                    "444555666\r\n" +
                    "777888999\r\n";
    approve(testValue, "PuzzleTest.Blocks_HorizontalPuzzle_ReturnsCollectionOfBlocks.approved.txt");
});

asyncTest("Rows_HorizontalPuzzle_ReturnsCollectionOfRows", function () {
    var testPuzzle = getHorizontalPuzzle();
    approve(displayString(testPuzzle.rows()), "PuzzleTest.Rows_HorizontalPuzzle_ReturnsCollectionOfRows.approved.txt");
});

asyncTest("Rows_VerticlePuzzle_ReturnsCollectionOfRows", function() {
    var testPuzzle = getVerticalPuzzle();
    approve(displayString(testPuzzle.rows()), "PuzzleTest.Rows_VerticlePuzzle_ReturnsCollectionOfRows.approved.txt");
});

asyncTest("Cols_HorizontalPuzzle_ReturnsCollectionOfColumns", function() {
    var testPuzzle = getHorizontalPuzzle();
    approve(displayString(testPuzzle.cols()), "PuzzleTest.Cols_HorizontalPuzzle_ReturnsCollectionOfColumns.approved.txt");
});

asyncTest("Cols_VerticlePuzzle_ReturnsCollectionOfCols", function() {
    var testPuzzle = getVerticalPuzzle();
    approve(displayString(testPuzzle.cols()), "PuzzleTest.Cols_VerticlePuzzle_ReturnsCollectionOfCols.approved.txt");
});
