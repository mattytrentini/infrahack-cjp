function clearQueryLayers() {
    var remove = [];
    for (var i = 0; i < map.layers.length; i++) {
        if (!map.layers[i].isBaseLayer) {
            remove.push(map.layers[i]);
        }
    }
    for (var i = 0; i < remove.length; i++) {
        map.removeLayer(remove[i], false);
    }
}

function init() {
    //Populate start address
    $("#startAddress").val("28 Beach Ave, Elwood, VIC, 3184");
    //Populate end address
    $("#endAddress").val("6 Fraser St, Richmond, VIC, 3121");
    $("#btnSafestRoute").click(function(e) { chosenType = TYPE_SAFE; });
    $("#btnTrainRoute").click(function(e) { chosenType = TYPE_TRAIN; });
    $("#btnSearch").click(function(e) { mockSearch(chosenType); });
    $("a.btn-journey").click(function(e) {
        $("a.btn-journey").removeClass("active");
        $(e.target).addClass("active");
    });
}

var TYPE_SAFE = 0;
var TYPE_TRAIN = 1;
var chosenType = TYPE_SAFE;

function mockSearch(type) {
    clearQueryLayers();
    //Mock Routes
    switch (type) {
        case TYPE_SAFE:
            map.addLayer(new OpenLayers.Layer.Vector("Safe Route", {
                projection: "EPSG:900913",
                styleMap: new OpenLayers.StyleMap({
                    strokeWidth: 3,
                    strokeColor: "#04B404"
                }),
                strategies: [new OpenLayers.Strategy.Fixed()],
                protocol: new OpenLayers.Protocol.HTTP({
                    url: "data/safe_route.json",
                    format: geoJsonFormat
                })
            }));
            break;
        default:
            map.addLayer(new OpenLayers.Layer.Vector("Train Route", {
                projection: "EPSG:900913",
                styleMap: new OpenLayers.StyleMap({
                    strokeWidth: 3,
                    strokeColor: "#0000ff"
                }),
                strategies: [new OpenLayers.Strategy.Fixed()],
                protocol: new OpenLayers.Protocol.HTTP({
                    url: "data/train_route.json",
                    format: geoJsonFormat
                })
            }));
            //Mock train stations
            map.addLayer(new OpenLayers.Layer.Vector("Train Stations", {
                projection: "EPSG:900913",
                styleMap: new OpenLayers.StyleMap({
                    externalGraphic: "data/train.png",
                    graphicWidth: 30,
                    graphicHeight: 30
                }),
                strategies: [new OpenLayers.Strategy.Fixed()],
                protocol: new OpenLayers.Protocol.HTTP({
                    url: "data/train_stations.json",
                    format: geoJsonFormat
                })
            }));
            break;
    }
    //Start point
    map.addLayer(new OpenLayers.Layer.Vector("Start Address", {
        projection: "EPSG:900913",
        styleMap: new OpenLayers.StyleMap({
            externalGraphic: "data/flag-green.png",
            graphicWidth: 30,
            graphicHeight: 30
        }),
        strategies: [new OpenLayers.Strategy.Fixed()],
        protocol: new OpenLayers.Protocol.HTTP({
            url: "data/start_address.json",
            format: geoJsonFormat
        })
    }));
    //End point
    map.addLayer(new OpenLayers.Layer.Vector("End Address", {
        projection: "EPSG:900913",
        styleMap: new OpenLayers.StyleMap({
            externalGraphic: "data/flag.png",
            graphicWidth: 30,
            graphicHeight: 30
        }),
        strategies: [new OpenLayers.Strategy.Fixed()],
        protocol: new OpenLayers.Protocol.HTTP({
            url: "data/end_address.json",
            format: geoJsonFormat
        })
    }));
    //Mock showers
    map.addLayer(new OpenLayers.Layer.Vector("Bike Pod", {
        projection: "EPSG:900913",
        styleMap: new OpenLayers.StyleMap({
            externalGraphic: "data/shower.png",
            graphicWidth: 30,
            graphicHeight: 30
        }),
        strategies: [new OpenLayers.Strategy.Fixed()],
        protocol: new OpenLayers.Protocol.HTTP({
            url: "data/bike_pod.json",
            format: geoJsonFormat
        })
    }));
    map.addLayer(new OpenLayers.Layer.Vector("Paid Shower Facility", {
        projection: "EPSG:900913",
        styleMap: new OpenLayers.StyleMap({
            externalGraphic: "data/shower.png",
            graphicWidth: 30,
            graphicHeight: 30
        }),
        strategies: [new OpenLayers.Strategy.Fixed()],
        protocol: new OpenLayers.Protocol.HTTP({
            url: "data/paid_shower_facility.json",
            format: geoJsonFormat
        })
    }));
}

var geoJsonFormat = null;
var map = null;

$(document).ready(function() {
    map = new OpenLayers.Map("map");
    map.addLayer(new OpenLayers.Layer.OSM());
    map.zoomToExtent([16131399.141743,-4565904.4197065,16146304.362257,-4551037.4177071]);
    geoJsonFormat = new OpenLayers.Format.GeoJSON();
    init();
});