var CLIENT_ID = '0V5NAVXIRLYN3O5OYPYKNRYOZFO2PGIFR5NELPVX3YONN334';
var CLIENT_SECRET = 'VYNNTIJVZYE1X2FHZ32XOOT0AK0QLDBZ53OLUZHXADXOXAAM';

var initData = [
  {
    title: 'Saint Isaac\'s Cathedral',
    lat: 59.936378,
    lng: 30.30223
  },
  {
    title: 'Bronze Horseman',
    lat: 59.933905,
    lng: 30.306485
  },
  {
    title: 'Church of the Savior on Blood',
    lat: 59.940100,
    lng: 30.3289
  },
  {
    title: 'Hermitage Museum',
    lat: 59.939832,
    lng: 30.31456
  },
  {
    title: 'Rostral Columns',
    lat: 59.944682,
    lng: 30.304971
  },
  {
    title: 'Kazan Cathedral',
    lat: 59.934209,
    lng: 30.316672
  },
  {
    title: 'Peter and Paul Fortress',
    lat: 59.950002,
    lng: 30.324571
  }
];

var map;

onGMapsError = function() {
  console.error('There was an error occured with the Google Maps. Please try again later.');
};

var Location = function(params) {
  var self = this;

  this.title = ko.observable(params.title);
  this.searchTitle = ko.observable(params.title.toLowerCase());
  this.titleRU = ko.observable();
  this.category = ko.observable();
  this.categoryIcon = ko.observable();
  this.address = ko.observable();
  this.checkinsCount = ko.observable();
  this.usersCount = ko.observable();
  this.tipCount = ko.observable();
  this.isHidden = ko.observable();

  var url = 'https://api.foursquare.com/v2/venues/search?v=20161016&ll='
    + params.lat + ',' + params.lng + '&intent=global&query=' + params.title
    + '&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET;

  $.getJSON(url).done(function(data) {
    var data = data.response.venues[0];
    var category = data.categories[0];
    // https://developer.foursquare.com/docs/responses/category
    var iconSize = 32;

    self.titleRU(data.name);
    self.category(category.shortName);
    self.categoryIcon(category.icon.prefix + iconSize + category.icon.suffix);
    self.address(data.location.formattedAddress.join(', '));
    self.checkinsCount(data.stats.checkinsCount);
    self.usersCount(data.stats.usersCount);
    self.tipCount(data.stats.tipCount);
  }).fail(function() {
    console.error('There was an error occured with the Foursquare API. Please try again later.');
  });

	this.marker = new google.maps.Marker({
    map: map,
    position: new google.maps.LatLng(params.lat, params.lng),
    title: self.title()
  });

  this.setMarker = ko.computed(function() {
    if(self.isHidden()) {
      self.marker.setMap(null);
    } else {
      self.marker.setMap(map);
    }

    return true;
  });
};

var AppViewModel = function() {
  var self = this;

  this.searchText = ko.observable('');
  this.locationsList = ko.observableArray();

  map = new google.maps.Map(document.getElementById('mapDiv'), {
    center: { lat: 59.942803, lng: 30.324841 },
    zoom: 13
  });

  initData.forEach(function(datum) {
    var location = new Location(datum);
    location.isHidden(false);
    self.locationsList.push(location);
  });

  this.selectLocation = function(location) {
    console.log(location.title());
  };

  this.filteredList = ko.computed(function() {
    return this.locationsList().filter(function(location) {
      var isMatched = location.searchTitle().indexOf(this.searchText().toLowerCase()) !== -1;
      location.isHidden(!isMatched);

      return isMatched;
    }, this);
  }, this);

};

function init() {
  ko.applyBindings(new AppViewModel());
};
