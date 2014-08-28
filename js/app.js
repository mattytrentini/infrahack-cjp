$(document).ready(function() {
    var map = new OpenLayers.Map("map");
    map.addLayer(new OpenLayers.Layer.OSM());
    map.zoomToMaxExtent();
});