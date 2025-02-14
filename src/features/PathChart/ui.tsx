import type { TPathChart } from "./types.ts";
import { FC, useState } from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import getDateFormatted from "@/shared/utils/getDateFormatted";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PathChart: FC<TPathChart> = (props) => {
  const { data, map } = props;

  const [checkboxes, setCheckboxes] = useState({
    alt: false,
    direction: false,
    fuel1: false,
    ignition: true,
    speed: false,
    voltage: false,
  });
  console.log(data);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
    //@ts-ignore
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const dataIndex = elements[0].index;
        const value = data[dataIndex];
        map.current.setView([value.lat, value.lng], 13);
      }
    },
  };

  const labels = data.slice(0, 1200).map((element: any) => getDateFormatted(new Date(element.datetime)));
  const colorDatasets = {
    alt: "red",
    ignition: "blue",
    voltage: "yellow",
    speed: "purple",
    direction: "green",
    fuel1: "pink",
  };

  const datasetsChart = [];
  for (const label in checkboxes) {
    //@ts-ignore
    const checkbox = checkboxes[label];

    if (checkbox) {
      datasetsChart.push({
        label: label,
        //@ts-ignore
        data: data.slice(0, 1200).map((element) => element.reserve[label]),
        borderColor: colorDatasets[label as keyof typeof colorDatasets],
      });
    }
  }

  const dataChart = {
    labels,
    datasets: datasetsChart,
  };

  return (
    <div className="path-chart" style={{ height: 300, width: "100%", paddingInline: "30px" }}>
      <div className="path-chart__checkboxes" style={{ display: "flex", columnGap: "20px" }}>
        <div>
          <input
            type="checkbox"
            id="alt"
            name="alt"
            onChange={() => {
              const newCheckbox = { ...checkboxes };
              newCheckbox.alt = !newCheckbox.alt;

              setCheckboxes(newCheckbox);
            }}
            checked={checkboxes.alt}
          />
          <label htmlFor="alt">Alt</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="ignition"
            name="ignition"
            onChange={() => {
              const newCheckbox = { ...checkboxes };
              newCheckbox.ignition = !newCheckbox.ignition;

              setCheckboxes(newCheckbox);
            }}
            checked={checkboxes.ignition}
          />
          <label htmlFor="ignition">Ignition</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="voltage"
            name="voltage"
            onChange={() => {
              const newCheckbox = { ...checkboxes };
              newCheckbox.voltage = !newCheckbox.voltage;

              setCheckboxes(newCheckbox);
            }}
            checked={checkboxes.voltage}
          />
          <label htmlFor="voltage">Voltage</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="speed"
            name="speed"
            onChange={() => {
              const newCheckbox = { ...checkboxes };
              newCheckbox.speed = !newCheckbox.speed;

              setCheckboxes(newCheckbox);
            }}
            checked={checkboxes.speed}
          />
          <label htmlFor="speed">Speed</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="direction"
            name="direction"
            onChange={() => {
              const newCheckbox = { ...checkboxes };
              newCheckbox.direction = !newCheckbox.direction;

              setCheckboxes(newCheckbox);
            }}
            checked={checkboxes.direction}
          />
          <label htmlFor="direction">Direction</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="fuell"
            name="fuell"
            onChange={() => {
              const newCheckbox = { ...checkboxes };
              newCheckbox.fuel1 = !newCheckbox.fuel1;

              setCheckboxes(newCheckbox);
            }}
            checked={checkboxes.fuel1}
          />
          <label htmlFor="fuell">Fuell</label>
        </div>
      </div>
      <Line options={options} data={dataChart} />;
    </div>
  );
};

export default PathChart;
