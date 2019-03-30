import React from "react";
import { Group } from "@vx/group";
import { genBins } from "@vx/mock-data";
import { scaleLinear } from "@vx/scale";
import { HeatmapCircle } from "@vx/heatmap";

const hot1 = "#77312f";
const hot2 = "#f33d15";
const bg = "#28272c";

const data = genBins(10, 4);

const xdata = [
  {
    bin: 0,
    bins: [
      {
        bin: 0,
        login: "jordanhudgens",
        count: 3.103303157525561
      },
      {
        bin: 150,
        login: "elorest",
        count: 56.60350266341802
      },
      {
        bin: 300,
        login: "mjackson",
        count: 46.480537467844094
      },
      {
        bin: 450,
        login: "ewold",
        count: 0.59212496117656
      }
    ]
  },
  {
    bin: 1,
    bins: [
      {
        bin: 0,
        login: "jordanhudgens",
        count: 20.626483818239393
      },
      {
        bin: 150,
        login: "elorest",
        count: 54.68329071815333
      },
      {
        bin: 300,
        login: "mjackson",
        count: 42.32093297810987
      },
      {
        bin: 450,
        login: "ewold",
        count: 19.46967436627989
      }
    ]
  },
  {
    bin: 2,
    bins: [
      {
        bin: 0,
        login: "jordanhudgens",
        count: 91.80756755949898
      },
      {
        bin: 150,
        login: "elorest",
        count: 56.65604108589516
      },
      {
        bin: 300,
        login: "mjackson",
        count: 6.023587023346034
      },
      {
        bin: 450,
        login: "ewold",
        count: 24.278462389024135
      }
    ]
  },
  {
    bin: 3,
    bins: [
      {
        bin: 0,
        login: "jordanhudgens",
        count: 86.9219448793823
      },
      {
        bin: 150,
        login: "elorest",
        count: 10.315910162847269
      },
      {
        bin: 300,
        login: "mjackson",
        count: 12.459681985670967
      },
      {
        bin: 450,
        login: "ewold",
        count: 11.022518343991038
      }
    ]
  },
  {
    bin: 4,
    bins: [
      {
        bin: 0,
        login: "jordanhudgens",
        count: 55.73875613721191
      },
      {
        bin: 150,
        login: "elorest",
        count: 11.680607649892833
      },
      {
        bin: 300,
        login: "mjackson",
        count: 41.525217843253316
      },
      {
        bin: 450,
        login: "ewold",
        count: 7.993670210990728
      }
    ]
  },
  {
    bin: 5,
    bins: [
      {
        bin: 0,
        login: "jordanhudgens",
        count: 38.97541642794291
      },
      {
        bin: 150,
        login: "elorest",
        count: 25.37369185117021
      },
      {
        bin: 300,
        login: "mjackson",
        count: 7.895535910392759
      },
      {
        bin: 450,
        login: "ewold",
        count: 22.753317910667665
      }
    ]
  },
  {
    bin: 6,
    bins: [
      {
        bin: 0,
        login: "jordanhudgens",
        count: 6.630573441301202
      },
      {
        bin: 150,
        login: "elorest",
        count: 36.13246243872769
      },
      {
        bin: 300,
        login: "mjackson",
        count: 42.55804238582287
      },
      {
        bin: 450,
        login: "ewold",
        count: 17.908519760517393
      }
    ]
  },
  {
    bin: 7,
    bins: [
      {
        bin: 0,
        login: "jordanhudgens",
        count: 6.1933324376432175
      },
      {
        bin: 150,
        login: "elorest",
        count: 7.382115402931044
      },
      {
        bin: 300,
        login: "mjackson",
        count: 45.390129055703824
      },
      {
        bin: 450,
        login: "ewold",
        count: 14.379347516377711
      }
    ]
  },
  {
    bin: 8,
    bins: [
      {
        bin: 0,
        login: "jordanhudgens",
        count: 30.021777353255775
      },
      {
        bin: 150,
        login: "elorest",
        count: 1.3387697092445638
      },
      {
        bin: 300,
        login: "mjackson",
        count: 14.843267288755857
      },
      {
        bin: 450,
        login: "ewold",
        count: 15.942787893420235
      }
    ]
  },
  {
    bin: 9,
    bins: [
      {
        bin: 0,
        login: "jordanhudgens",
        count: 76.86224190880888
      },
      {
        bin: 150,
        login: "elorest",
        count: 10.02348904856641
      },
      {
        bin: 300,
        login: "mjackson",
        count: 22.301409134188265
      },
      {
        bin: 450,
        login: "ewold",
        count: 13.916873543091418
      }
    ]
  }
];

// TODO
// make data query here
const max = (data, value = d => d) => Math.max(...data.map(value));
const min = (data, value = d => d) => Math.min(...data.map(value));

const bins = d => d.bins;
const count = d => d.count;

const colorMax = max(data, d => max(bins(d), count));
const bucketSizeMax = max(data, d => bins(d).length);

const xScale = scaleLinear({
  domain: [0, data.length]
});
const yScale = scaleLinear({
  domain: [0, bucketSizeMax]
});
const circleColorScale = scaleLinear({
  range: [hot1, hot2],
  domain: [0, colorMax]
});
const opacityScale = scaleLinear({
  range: [0.1, 1],
  domain: [0, colorMax]
});

const AccountHeatMap = ({
  data,
  width,
  height,
  separation = 20,
  margin = {
    top: 10,
    left: 20,
    right: 20,
    bottom: 110
  }
}) => {
  // bounds
  let size = width;
  if (size > margin.left + margin.right) {
    size = width - margin.left - margin.right - separation;
  }

  const xMax = size;
  const yMax = height - margin.bottom - margin.top;

  const binWidth = xMax / data.length;
  const binHeight = yMax / bucketSizeMax;
  const radius = min([binWidth, binHeight]) / 2;

  xScale.range([0, xMax]);
  yScale.range([yMax, 0]);

  return (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} rx={14} fill={bg} />
      <Group top={margin.top} left={margin.left}>
        <HeatmapCircle
          data={data}
          xScale={xScale}
          yScale={yScale}
          colorScale={circleColorScale}
          opacityScale={opacityScale}
          radius={radius}
          gap={2}
        >
          {heatmap => {
            return heatmap.map(bins => {
              return bins.map(bin => {
                return (
                  <circle
                    key={`heatmap-circle-${bin.row}-${bin.column}`}
                    className="vx-heatmap-circle"
                    cx={bin.cx}
                    cy={bin.cy}
                    r={bin.r}
                    fill={bin.color}
                    fillOpacity={bin.opacity}
                    onClick={event => {
                      const { row, column } = bin;
                      alert(JSON.stringify({ row, column, ...bin.bin }));
                    }}
                  />
                );
              });
            });
          }}
        </HeatmapCircle>
      </Group>
    </svg>
  );
};

export default AccountHeatMap;
