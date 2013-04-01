sudoku.PossibleValues = function () {

    var self = this;

    var values = sudoku.AllNonEmptyValues();
    var manuallyRemoved = [];

    this.values = function() {
        return values;
    };

    this.add = function (value) {
        if (_.contains(sudoku.AllNonEmptyValues(), value)) {
            if (!_.contains(values, value) && !_.contains(manuallyRemoved, value)) {
                values.push(value);
                values.sort();
            }
        }
    };

    this.remove = function(value) {
        values = _.without(values, value);
    };

    this.manuallyRemove = function(value) {
        self.remove(value);
        if (!_.contains(manuallyRemoved, value))
            manuallyRemoved.push(value);
    };

    this.manuallyAdd = function(value) {
        manuallyRemoved = _.without(manuallyRemoved, value);
        self.add(value);
    };

    this.fromArray = function(newValues) {
        values = _.difference(newValues, manuallyRemoved);
    };

};