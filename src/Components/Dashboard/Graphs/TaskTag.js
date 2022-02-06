import React, { useState, useEffect } from "react";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const TaskTag = ({ todoState, tags }) => {
  const [chartData, setChartData] = useState(null),
    [data, setData] = useState([]),
    [colours, setColours] = useState([]);
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
  const generateChartData = () => {
    let finalData = [];
    let finalCOlours = [];
    tags.forEach((tag) => {
      const activeTasks = todoState?.activeTasks?.filter(
        (activeTask) => activeTask.tag === tag.tag
      );
      const completedTasks = todoState?.completedTasks?.filter(
        (completedTask) => completedTask.tag === tag.tag
      );
      const removedTasks = todoState?.removedTasks?.filter(
        (removedTask) => removedTask.tag === tag.tag
      );
      const newEntry = [
        ...finalData,
        activeTasks?.length + completedTasks?.length + removedTasks?.length,
      ];
      finalCOlours.push(tag.color);
      console.log(newEntry);
      finalData = newEntry;
    });
    setData(finalData);
    setColours(finalCOlours);
  };
  useEffect(() => {
    generateChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags, todoState]);
  useEffect(() => {
    const chartData = {
      labels: [...tags.map((tag) => tag.tag)],
      datasets: [
        {
          label: "Tags distribution",
          data: [...data],
          backgroundColor: [...colours],
          borderColor: "transparent",
          offset: 5 * (tags.length + 1),
          borderRadius: 10,
        },
      ],
    };
    setChartData(chartData);
  }, [colours, data, tags]);
  return <>{chartData && <Doughnut options={options} data={chartData} />}</>;
};

export default TaskTag;
