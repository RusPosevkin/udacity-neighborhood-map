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
    lat: 59.9341891,
    lng: 30.3244829
  },
  {
    title: 'Peter and Paul Fortress',
    lat: 59.9499162,
    lng: 30.3172042
  }
];

var map;
var openedInfoWindow;

onGMapsError = function() {
  console.error('There was an error occured with the Google Maps. Please try again later.');
};

var Location = function(params) {
  var self = this;

  this.title = ko.observable(params.title);
  this.searchTitle = ko.observable(params.title.toLowerCase());
  this.titleRU = ko.observable();
  this.category = ko.observable();
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

    self.titleRU(data.name);
    self.category(data.categories[0].shortName);
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

  this.marker.addListener('click', function() {
    // close opened infoWindow
    if (openedInfoWindow) {
      openedInfoWindow.close();
    }

    var infoWindowContentData = [
      '<div class="info-window">',
        '<h4>', self.title(), '</h4>',
        '<h4> (', self.titleRU(), ')</h4>',
        '<p>',
          self.category(),
        '</p>',
        '<p>', self.address(), '</p>',
        '<p>',
          'This place was visited by <strong>', self.usersCount(), '</strong> people, ',
          'who made <strong>', self.checkinsCount() , '</strong> checkins ',
          'and <strong>', self.tipCount() ,'</strong> tips.',
        '</p>',
      '</div>'
    ];
    var infoWindow = new google.maps.InfoWindow({ content: infoWindowContentData.join('') });
    openedInfoWindow = infoWindow;

    infoWindow.open(map, self.marker);
  });

  this.selectLocation = function() {
    google.maps.event.trigger(self.marker, 'click');
  };
};

var AppViewModel = function() {
  var self = this;

  this.searchText = ko.observable('');
  this.locationsList = ko.observableArray();

  map = new google.maps.Map(document.getElementById('mapDiv'), {
    center: { lat: 59.942803, lng: 30.324841 },
    zoom: 14
  });

  initData.forEach(function(datum) {
    var location = new Location(datum);
    location.isHidden(false);
    self.locationsList.push(location);
  });

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
