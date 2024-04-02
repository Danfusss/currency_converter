import React, { FC } from "react";

import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { DataObject } from "../types";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  data: DataObject[];
  checkCurrent: string[];
}

const LineChart: FC<LineChartProps> = ({ data, checkCurrent }) => {
  const chartData = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: "EUR",
        data: data.map((item) => item.eur),
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
        hidden: !checkCurrent.includes("eur"),
      },
      {
        label: "USD",
        data: data.map((item) => item.usd),
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        hidden: !checkCurrent.includes("usd"),
      },
      {
        label: "CNY",
        data: data.map((item) => item.cny),
        fill: false,
        backgroundColor: "rgb(255, 205, 86)",
        borderColor: "rgba(255, 205, 86, 0.2)",
        hidden: !checkCurrent.includes("cny"),
      },
    ],
  };

  return <Line data={chartData} />;
};

export default LineChart;
