sudoku.PossibleValues = function () {

    var self = this;

    this._values = sudoku.AllNonEmptyValues();
    this.manuallyRemoved = [];     // need to make manuallyRemoved a "private" member as shown in knockout js video

    this.values = function() {
        return self._values;
    };

    this.add = function (value) {
        if (_.contains(sudoku.AllNonEmptyValues(), value)) {
            if (!_.contains(self.values, value) && !_.contains(self.manuallyRemoved, value)) {
                self._values.push(value);
                self._values.sort();
            }
        }
    };

    this.remove = function(value) {
        self._values = _.without(self._values, value);
    };

    this.manuallyRemove = function(value) {
        self.remove(value);
        if (!_.contains(self.manuallyRemoved, value))
            self.manuallyRemoved.push(value);
    };

    this.manuallyAdd = function(value) {
        self.manuallyRemoved = _.without(self.manuallyRemoved, value);
        self.add(value);
    };

};