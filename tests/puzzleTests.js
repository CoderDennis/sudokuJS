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
    equal(list.length, 9);
    _.each(list, function (squares) {
        equal(list.length, 9);
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

asyncTest("Blocks_HorizontalPuzzle_ReturnsCollectionOfBlocks", function() {
    var testPuzzle = getHorizontalPuzzle();
    approve(displayString(testPuzzle.blocks()), "PuzzleTest.Blocks_HorizontalPuzzle_ReturnsCollectionOfBlocks.approved.txt");
});

asyncTest("Blocks_VerticlePuzzle_ReturnsCollectionOfBlocks", function() {
    var testPuzzle = getVerticalPuzzle();
    approve(displayString(testPuzzle.blocks()), "PuzzleTest.Blocks_VerticlePuzzle_ReturnsCollectionOfBlocks.approved.txt");
});

test("Blocks_NewPuzzle_ReturnsCollectionOfBlocks", function() {
    var testPuzzle = new sudoku.Puzzle();
    var blocks = testPuzzle.blocks();
    equal(blocks.length, 9, "There should be 9 blocks.");
    strictEqual(_.first(blocks[0]), testPuzzle.squares(0), "First square in first block should be the first square");
    strictEqual(_.last(blocks[0]), testPuzzle.squares(20), "Last square in first block should be 21st square");
    strictEqual(_.first(blocks[3]), testPuzzle.squares(3));
    strictEqual(_.last(blocks[3]), testPuzzle.squares(23));
    strictEqual(_.first(blocks[6]), testPuzzle.squares(6));
    strictEqual(_.last(blocks[6]), testPuzzle.squares(26));
    strictEqual(_.first(blocks[1]), testPuzzle.squares(27));
    strictEqual(_.last(blocks[1]), testPuzzle.squares(47));
    strictEqual(_.first(blocks[4]), testPuzzle.squares(30));
    strictEqual(_.last(blocks[4]), testPuzzle.squares(50));
    strictEqual(_.first(blocks[7]), testPuzzle.squares(33));
    strictEqual(_.last(blocks[7]), testPuzzle.squares(53));
    strictEqual(_.first(blocks[2]), testPuzzle.squares(54));
    strictEqual(_.last(blocks[2]), testPuzzle.squares(74));
    strictEqual(_.first(blocks[5]), testPuzzle.squares(57));
    strictEqual(_.last(blocks[5]), testPuzzle.squares(77));
    strictEqual(_.first(_.last(blocks)), testPuzzle.squares(60));
    strictEqual(_.last(_.last(blocks)), testPuzzle.squares(80), "Last square in last block should be the last square");
});

test("RowFromSquare_CenterSquare_ReturnsRowContainingSquare", function() {
    var testPuzzle = new sudoku.Puzzle();
    var row = testPuzzle.rowFromSquare(testPuzzle.squares(40));
    ok(_.indexOf(row, testPuzzle.squares(40)) > -1);
    strictEqual(row[4], testPuzzle.squares(40));
});

test("RowFromSquare_NewSquare_NotFound", function() {
    var testPuzzle = new sudoku.Puzzle();
    var testSquare = new sudoku.Square();
    ok(!testPuzzle.rowFromSquare(testSquare));
});

test("FromString_ValidPuzzle_IsSolved", function() {
    var testPuzzle = new sudoku.Puzzle();
    testPuzzle.fromString("382576914659412837174398526416839752835267491297145368721954683548623179963781245");
    ok(testPuzzle.isSolved());
});

asyncTest("FromString_ValidPuzzleWithLocks_ProperSquaresAreLocked", function() {
    var testPuzzle = new sudoku.Puzzle();
    testPuzzle.fromString("382576914659412837174398526416839752835267491297145368721954683548623179963781245:" +
        "010101010101010101010101010101010101010101010101010101010101010101010101010101010");
    testPuzzle.clearUnlockedSquares();
    approve(displayString(testPuzzle.rows()), "PuzzleTest.FromString_ValidPuzzleWithLocks_ProperSquaresAreLocked.approved.txt");
});