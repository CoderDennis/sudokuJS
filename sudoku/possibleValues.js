sudoku.PossibleValues = function () {

    var self = this;

    this.values = sudoku.AllNonEmptyValues();
    this.manuallyRemoved = [];     // need to make manuallyRemoved a "private" member as shown in knockout js video

    this.add = function (value) {
        if (!_.contains(self.values, value) && !_.contains(self.manuallyRemoved, value))
            self.values.push(value);
    };

    this.remove = function(value) {
        self.values = _.without(self.values, value);
    };

    this.manuallyRemove = function(value) {
        self.remove(value);
        if (!_.contains(self.manuallyRemoved, value))
            self.manuallyRemoved.push(value);
    };

};