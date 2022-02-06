import React, { useState, useEffect } from "react";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
const SessionTag = () => {
  const [chartData, setChartData] = useState(null),
    [data, setData] = useState([]),
    [colours, setColours] = useState([]);
  ChartJS.register(ArcElement, Tooltip, Legend);
  const { analyticData, tags } = useSelector((state) => ({ ...state }));
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Tag Distribution",
        color: "rgba(255, 255, 255, 0.8)",
        font: {
          size: 15,
        },
      },
      legend: {
        display: tags.length <= 10,
      },
    },
  };
  const generateChartData = () => {
    let finalData = new Array(tags.length).fill(0);
    let finalCOlours = [];
    console.log(analyticData);
    if (analyticData) {
      tags.forEach((tag, idx) => {
        Object.values(analyticData)?.forEach((item) => {
          let tagTime = item[tag.tag] ? item[tag.tag] : 0;
          finalData[idx] = finalData[idx] + tagTime / 3600;
        });
        finalCOlours.push(tag.color);
      });
    }
    setData(finalData);
    console.log(finalData);
    setColours(finalCOlours);
  };
  useEffect(() => {
    generateChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags, analyticData]);
  useEffect(() => {
    const chartData = {
      labels: [...tags.map((tag) => tag.tag)],
      datasets: [
        {
          label: "Tags distribution",
          data: [...Object.values(data)],
          backgroundColor: [...colours],
          borderColor: "transparent",
        },
      ],
    };
    setChartData(chartData);
  }, [colours, data, tags]);
  return <>{chartData && <Doughnut options={options} data={chartData} />}</>;
};

export default SessionTag;
