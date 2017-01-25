var CLIENT_ID = '0V5NAVXIRLYN3O5OYPYKNRYOZFO2PGIFR5NELPVX3YONN334';
var CLIENT_SECRET = 'VYNNTIJVZYE1X2FHZ32XOOT0AK0QLDBZ53OLUZHXADXOXAAM';

var locationsList = [
  {
    title: 'Saint Isaac\'s Cathedral',
    lat: 59.936378,
    long: 30.30223
  },
  {
    title: 'Bronze Horseman',
    lat: 59.933905,
    long: 30.306485
  }
];
var latitude = 59.933905;
var longitude = 30.306485;
var query = 'Church of the Savior on Blood';
var url = 'https://api.foursquare.com/v2/venues/search?v=20161016&ll='
  + latitude + ',' + longitude + '&intent=global&query=' + query
  + '&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET;


$.getJSON(url).done(function(data) {
  console.log(data.response.venues[0]);
}).fail(function() {
  console.error('There was an error occured with the Foursquare API. Please try again later.');
});

var AppViewModel = function() {
    this.data = ko.observableArray(['foo', 'bar']);

    this.addValue = function() {
        this.data.push('additional value');
    };

    this.reset = function() {
        this.data(['foo', 'bar']);
    };
};

ko.applyBindings(new AppViewModel());
