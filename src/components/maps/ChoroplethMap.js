import React, { Component } from "react";
import Datamap from "datamaps";
import * as d3 from "d3";
import { scaleLinear } from "d3-scale";
import { geoMercator, geoPath } from "d3-geo";
import UsaJson from "../data/Usa.topo.json";

class ChoroplethMap extends Component {
  constructor() {
    super();

    this.state = {
      data: [
        ["AZ", 75],
        ["NY", 43],
        ["FL", 50],
        ["IL", 88],
        ["NM", 21],
        ["VT", 43],
        ["CA", 21],
        ["NH", 19],
        ["WY", 60],
        ["HI", 4],
        ["OR", 44],
        ["QA", 38],
        ["NV", 67]
      ]
    };
  }

  componentDidMount() {
    // Datamaps expect data in format:
    // { "USA": { "fillColor": "#42a844", numberOfWhatever: 75},
    //   "FRA": { "fillColor": "#8dc386", numberOfWhatever: 43 } }
    let dataset = {};

    // We need to colorize every country based on "numberOfWhatever"
    // colors should be uniq for every value.
    // For this purpose we create palette(using min/max this.props.data-value)
    let onlyValues = this.state.data.map(function(obj) {
      return obj[1];
    });
    let minValue = Math.min.apply(null, onlyValues),
      maxValue = Math.max.apply(null, onlyValues);

    // create color palette function
    // color can be whatever you wish
    let paletteScale = d3
      .scaleLinear()
      .domain([minValue, maxValue])
      .range(["#EFEFFF", "#02386F"]); // blue color

    // fill dataset in appropriate format
    this.state.data.forEach(function(item) {
      //
      // item example value ["USA", 70]
      let iso = item[0],
        value = item[1];
      dataset[iso] = { numberOfThings: value, fillColor: paletteScale(value) };
    });

    let map = new Datamap({
      element: document.getElementById("cloropleth_map"),
      scope: "usa",
      geographyConfig: {
        popupOnHover: true,
        highlightOnHover: true,
        borderColor: "#444",
        highlightBorderWidth: 1,
        borderWidth: 0.5,
        dataJson: UsaJson,
        popupTemplate: function(geo, data) {
          // don't show tooltip if country don't present in dataset
          if (!data) {
            return;
          }
          // tooltip content
          return [
            '<div class="hoverinfo">',
            "<strong>",
            geo.properties.name,
            "</strong>",
            "<br>Count: <strong>",
            data.numberOfThings,
            "</strong>",
            "</div>"
          ].join("");
        }
      },
      fills: {
        HIGH: "#afafaf",
        LOW: "#123456",
        MEDIUM: "blue",
        UNKNOWN: "rgb(0,0,0)",
        defaultFill: "#eee"
      },
      data: dataset,
      setProjection: function(element) {
        var projection = d3
          .geoMercator()
          .center([-106.3468, 68.1304]) // always in [East Latitude, North Longitude]
          .scale(200)
          .translate([element.offsetWidth / 2, element.offsetHeight / 2]);

        var path = d3.geoPath().projection(projection);
        return { path: path, projection: projection };
      }
    });
  }
  render() {
    return (
      <div
        id="cloropleth_map"
        style={{
          height: "100%",
          width: "100%"
        }}
      />
    );
  }
}

export default ChoroplethMap;
