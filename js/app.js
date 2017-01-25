var AppViewModel = function() {
    this.data = ko.observableArray(['foo', 'bar']);

    this.addValue = function() {
        this.data.push('additional value');
        console.log(this.data);
    };

    this.reset = function() {
        this.data(['foo', 'bar']);
    };
};

ko.applyBindings(new AppViewModel());
