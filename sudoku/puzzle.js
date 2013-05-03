sudoku.Puzzle = function() {

    var self = this;

    var squares = [],
        rows = [], // As List(Of List(Of Square))
        cols = [], // As List(Of List(Of Square))
        blks = []; // As List(Of List(Of Square))

    var squareValueChanged = [];

    this.onSquareValueChanged = function(callback) {
        squareValueChanged.push(callback);
    };

    this.squares = function(index) {
        if (index !== undefined) {
            return squares[index];
        }
        return squares;
    };

    this.rows = function() {
        return rows;
    };

    this.cols = function() {
        return cols;
    };

    this.blocks = function() {
        return blks;
    };

    this.suspendSquareValueChangedEvent = false;

    var squareValueChangedInternal = function(square, oldValue, value) {
        if (!self.suspendSquareValueChangedEvent) {
            //If e.OldValue <> Values.Empty Then
            if (oldValue !== sudoku.values.empty) {

                //    'reset possible values for affected squares
                //    For Each sq In RowFromSquare(changedSquare)
                //        ResetPossibleValuesForSquare(sq)
                //    Next
                //    For Each sq In ColFromSquare(changedSquare)
                //        If sq IsNot changedSquare Then
                //            ResetPossibleValuesForSquare(sq)
                //        End If
                //    Next
                //    For Each sq In BlockFromSquare(changedSquare)
                //        If sq IsNot changedSquare Then
                //            ResetPossibleValuesForSquare(sq)
                //        End If
                //    Next
            } //End If
            //'Find row, col & block that this square belongs to and remove new value from possible values of all those squares
            //If e.NewValue <> Values.Empty Then
            if (value !== sudoku.values.empty) {
                //    For Each sq In RowFromSquare(changedSquare)
                //        sq.PossibleValues.Remove(e.NewValue)
                //    Next
                //    For Each sq In ColFromSquare(changedSquare)
                //        sq.PossibleValues.Remove(e.NewValue)
                //    Next
                //    For Each sq In BlockFromSquare(changedSquare)
                //        sq.PossibleValues.Remove(e.NewValue)
                //    Next
            } //End If
            //RaiseEvent SquareValueChanged(changedSquare, e)
            for (var i = 0; i < squareValueChanged.length; i++) {
                squareValueChanged[i](square, oldValue, value);
            }
        }
    };

    var init = function() {

        for (var i = 0; i < 81; i++) {
            var sq = new sudoku.Square();
            sq.onValueChanged(squareValueChangedInternal);
            squares.push(sq);
        }

        rows = _.map(_.range(9), function(r) {
            return _.first(_.rest(squares, r * 9), 9);
        });

        var colOrder = _.chain(_.range(9))
            .map(function(c) {
                return _.map(rows, function(r) {
                    return r[c];
                });
            })
            .flatten()
            .value();

        cols = _.map(_.range(9), function(r) {
            return _.first(_.rest(colOrder, r * 9), 9);
        });

        var blockRows = _.map(_.range(27), function(br) {
            return _.first(_.rest(squares, br * 3), 3);
        });

        var blockOrder = _.chain(_.range(3))
            .map(function(r) {
                return _.select(blockRows, function(br) {
                    if (_.indexOf(blockRows, br) % 3 == r) {
                        return blockRows;
                    }
                    return undefined;
                });
            })
            .flatten()
            .value();

        blks = _.map(_.range(9), function(r) {
            return _.first(_.rest(blockOrder, r * 9), 9);
        });

    };

    init();

    var groupFromSquare = function(groups, sq) {
        return _.find(groups, function(g) {
            return _.indexOf(g, sq) > -1;
        });
    };

    this.rowFromSquare = function(sq) {
        return groupFromSquare(rows, sq);
    };

    this.colFromSquare = function(sq) {
        return groupFromSquare(cols, sq);
    };

    this.blockFromSquare = function(sq) {
        return groupFromSquare(blks, sq);
    };

    this.fromString = function(value) {
        _.each(squares, function(sq) {
            sq.locked = false;
        });
        var squareValues = value;
        var lockedValues;
        var colonPosition = _.indexOf(value, ":");
        if (colonPosition > -1) {
            squareValues = _.first(value, colonPosition);
            lockedValues = _.rest(value, colonPosition + 1);
        }
        if (squareValues.length !== 81) {
            throw "input string must be of length 81.";
        }
        for (var i = 0; i < 81; i++) {
            squares[i].value(+squareValues[i]);
        }
        if (lockedValues) {
            if (lockedValues.length !== 81) {
                throw "2nd half of input string must be of length 81.";
            }
            for (var i = 0; i < 81; i++) {
                squares[i].locked = (lockedValues[i] == "1");
            }
        }
    };

    var groupContainsOneThroughNine = function(group) {
        var sortedGroupValues = _.chain(group)
            .map(function(sq) {
                return sq.value();
            })
            .value();

        sortedGroupValues.sort();

        return _.isEqual(sortedGroupValues, sudoku.allNonEmptyValues());
    };

    this.isSolved = function() {
        if (_.some(squares, function(sq) { return sq.value() == sudoku.values.empty; }))
            return false;
        if (_.some(rows, function(row) { return !groupContainsOneThroughNine(row); }))
            return false;
        if (_.some(cols, function (col) { return !groupContainsOneThroughNine(col); }))
            return false;
        return _.every(blks, function(block) { return groupContainsOneThroughNine(block); });
    };

    this.unlockedSquares = function() {
        return _.where(squares, { locked: false });
    };

    this.clearUnlockedSquares = function() {
        _.each(self.unlockedSquares(), function(sq) {
            sq.value(sudoku.values.empty);
        });
    };

};
