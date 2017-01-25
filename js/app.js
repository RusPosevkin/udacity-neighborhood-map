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
  },
  {
    title: 'Church of the Savior on Blood',
    lat: 59.940100,
    long: 30.3289
  },
  {
    title: 'Hermitage Museum',
    lat: 59.939832,
    long: 30.31456
  },
  {
    title: 'Rostral Columns',
    lat: 59.944682,
    long: 30.304971
  },
  {
    title: 'Kazan Cathedral',
    lat: 59.934209,
    long: 30.316672
  },
  {
    title: 'Peter and Paul Fortress',
    lat: 59.950002,
    long: 30.324571
  }
];

locationsList.forEach(function(item) {
  var url = 'https://api.foursquare.com/v2/venues/search?v=20161016&ll='
    + item.lat + ',' + item.long + '&intent=global&query=' + item.title
    + '&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET;

  $.getJSON(url).done(function(data) {
    console.log(data.response.venues[0]);
  }).fail(function() {
    console.error('There was an error occured with the Foursquare API. Please try again later.');
  });
})

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
