sudoku.Square = function() {

    var self = this;

    var valueChanged = [];

    this.locked = false;

    var value = sudoku.values.empty;
    this.value = function(val) {
        if (val !== undefined && val !== value) {
            if (self.locked) {
                throw new Error("Square value cannot be changed because it is locked.");
            }
            var oldValue = value;
            value = val;
            for (var i = 0; i < valueChanged.length; i++) {
                valueChanged[i](this, oldValue, value);
            }
        }
        return value;
    };
    
    var possilbeValues = new sudoku.PossibleValues();
    this.possibleValues = function() {
        return possilbeValues;
    };

    this.onValueChanged = function(callback) {
        valueChanged.push(callback);
    };

}