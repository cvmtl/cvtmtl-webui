var treeIcon = L.ExtraMarkers.icon({
    icon: 'fa-tree',
    markerColor: 'green',
    shape: 'circle',
    prefix: 'fa'
});

var markers = new Array();

function postMarker(marker) {
  console.log(marker.getLatLng());
}

var drawnItems = new L.FeatureGroup();

var styleEditor = L.control.styleEditor({
    position: "topleft"
});
$(document).ready(function () {
//  visurl = 'https://anagraph.carto.com/api/v2/viz/bd20a288-5a7d-11e6-85cb-0e3ff518bd15/viz.json';
  var visurl = 'https://thomasragot.carto.com/api/v2/viz/a616c578-856a-11e6-864f-0ecd1babdde5/viz.json';
  vis = cartodb.createVis('map', visurl , {
     shareable: false,
    // title: true,
     description: false,
    search: false,
    // tiles_loader: true,
    layer_selector: false,
    center_lat: 45.5388,
    center_lon: -73.6654,
    zoom: 11,
    no_cdn: true
  })
  .error(function(err) {
    console.log(err);
  })
  .done(function (vis,layers) {
    var map = vis.getNativeMap();

    map.addLayer(drawnItems);
    map.addControl(styleEditor);

    var drawControl = new L.Control.Draw({
      position: 'topright',
      draw: {
        polyline: false,
        polygon: false,
        circle: false,
        rectangle: false,
        marker: {
          icon: treeIcon
        }
      },
      edit: {
        featureGroup: drawnItems,
        edit: false
      }
    });
    map.addControl(drawControl);
    map.on('draw:created', function (e) {
      drawnItems.addLayer(e.layer);
      //map.addLayer(e.layer);
      console.log(drawnItems.getLayers());
      postMarker(e.layer);
    });
    map.on('draw:drawstart', function (e) {
      console.log('test draw start');
    });
  });
});
