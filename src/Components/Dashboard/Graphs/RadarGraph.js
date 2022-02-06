import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const RadarGraph = ({ todoState }) => {
  const [chartData, setChartData] = useState(null);
  ChartJS.register(ArcElement, Tooltip, Legend);
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: true,
      },
    },
  };
  useEffect(() => {
    const chartData = {
      labels: ["Active", "Completed", "Discarded"],
      datasets: [
        {
          label: "# of Taks",
          data: [
            todoState?.activeTasks?.length,
            todoState?.completedTasks?.length,
            todoState?.removedTasks?.length,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderWidth: 2,
        },
      ],
    };
    setChartData(chartData);
  }, [
    todoState?.activeTasks?.length,
    todoState?.completedTasks?.length,
    todoState?.removedTasks?.length,
  ]);
  return <>{chartData && <Doughnut options={options} data={chartData} />}</>;
};

export default RadarGraph;
