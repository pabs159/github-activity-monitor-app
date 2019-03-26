import React, { Component } from "react";
import Datamap from "datamaps";
import * as d3 from "d3";
import UsaJson from "../data/Usa.topo.json";
import Axios from "axios";

class ChoroplethMap extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      data: []
    };
  }

  getAccountsByState() {
    Axios.get("https://bottega-activity-tracker-api.herokuapp.com/locations", {
      withCredentials: true
    })
      .then(response => {
        const data = Object.keys(response.data).map(stateAbbreviation => {
          return [stateAbbreviation, response.data[stateAbbreviation].length];
        });

        this.setState({ data: data, isLoading: false });
        this.mapSetup();
      })
      .catch(error => {
        console.log("get locations error", error);
      });
  }

  componentDidMount() {
    this.getAccountsByState();
  }

  mapSetup() {
    let dataset = {};
    let onlyValues = this.state.data.map(function(obj) {
      return obj[1];
    });
    let minValue = Math.min.apply(null, onlyValues),
      maxValue = Math.max.apply(null, onlyValues);

    let paletteScale = d3
      .scaleLinear()
      .domain([minValue, maxValue])
      .range(["#EFEFFF", "#02386F"]); // blue color

    this.state.data.forEach(function(item) {
      let iso = item[0],
        value = item[1];
      dataset[iso] = { numberOfThings: value, fillColor: paletteScale(value) };
    });

    let cx = new Datamap({
      element: document.getElementById("cloropleth_map"),
      scope: "usa",
      width: "2500",
      geographyConfig: {
        popupOnHover: true,
        highlightOnHover: true,
        borderColor: "#444",
        highlightBorderWidth: 1,
        borderWidth: 0.5,
        dataJson: UsaJson,
        popupTemplate: function(geo, data) {
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
          height: "500px",
          width: "1200px"
        }}
      />
    );
  }
}

export default ChoroplethMap;
