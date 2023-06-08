/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v5/
 * ---------------------------------------
 */

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);

// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  panX: "rotateX",
  panY: "rotateY",
  projection: am5map.geoOrthographic(),
  paddingBottom: 20,
  paddingTop: 20,
  paddingLeft: 20,
  paddingRight: 20
}));

// Create basemap series for other world countries
var basemapSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow,
  exclude: ["BR","BO", "PA", "CR","MX", "AR", "CO", "VE", "PE", "CL", "EC", "CU", "DO", "HT", "PR", "JM", "TT", "BS", "BZ", "GY", "SR", "UY", "PY", "NI", "HN", "SV", "GT", "BB", "LC", "AG", "DM", "GD", "VC", "KN", "AI", "MS", "CW", "SX", "AW", "PR", "CU", "HT", "DO", "JM", "TT", "BB", "DM", "VC", "LC", "GD", "KN", "AI", "MS", "BL", "CW", "SX", "AW", "AQ"] // Exclude Latin American and Caribbean countries
}));

basemapSeries.mapPolygons.template.setAll({
  fill: am5.color("#000000"),
  stroke: am5.color("#000000"), // Set line color to black
  strokeOpacity: 1 // Set line opacity to 1 (fully visible)
});

// Create main polygon series for Latin American and Caribbean countries
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow,
  include: ["BR","BO", "GF", "PA", "CR","MX", "AR", "CO", "VE", "PE", "CL", "EC", "CU", "DO", "HT", "PR", "JM", "TT", "BS", "BZ", "GY", "SR", "UY", "PY", "NI", "HN", "SV", "GT", "BB", "LC", "AG", "DM", "GD", "VC", "KN", "AI", "MS", "CW", "SX", "AW", "PR", "CU", "HT", "DO", "JM", "TT", "BB", "DM", "VC", "LC", "GD", "KN", "AI", "MS", "BL", "CW", "SX", "AW"] // Latin American and Caribbean countries
}));

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}",
  toggleKey: "active",
  interactive: true,
  fill: am5.color("#008000"), // Change the fill color to green
  stroke: am5.color("#000000"), // Set line color to black
  strokeWidth: 1.5, // Increase line width
  strokeOpacity: 1 // Set line opacity to 1 (fully visible)
});

polygonSeries.mapPolygons.template.states.create("hover", {
  fill: root.interfaceColors.get("primaryButtonHover")
});

// Create series for background fill
var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
backgroundSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"),
  fillOpacity: 0.1,
  strokeOpacity: 0
});
backgroundSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180)
});

// Create graticule series for gridlines
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
graticuleSeries.mapLines.template.setAll({
  strokeOpacity: 0.1,
  stroke: root.interfaceColors.get("alternativeBackground")
});

// Rotate animation
chart.animate({
  key: "rotationX",
  from: 60,
  to: 100,
  duration: 10000,
  loops: Infinity
});

// Make stuff animate on load
chart.appear(1000, 100);