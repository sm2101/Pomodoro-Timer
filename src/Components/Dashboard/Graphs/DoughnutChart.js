import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import UserTimeData from "../../Dialogs/UserTimeData";
import UserTimeDataMobile from "../../Dialogs/Mobile/UserTimeDataMobile";
import { useMediaQuery } from "@mui/material";
import { PolarArea } from "react-chartjs-2";
import SessionTag from "./SessionTag";
const DoughnutChart = ({ data, open, setOpen }) => {
  const [chartData, setChartData] = useState(null),
    [dataSetValues, setDataSetValues] = useState([0, 0, 0]),
    [idx, setIdx] = useState(1);
  const mobile = useMediaQuery("(max-width:600px)");
  ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "In a Glimpse",
        color: "rgba(255, 255, 255, 0.8)",
        font: {
          size: 15,
        },
      },
      legend: {
        display: true,
      },
    },
    scales: {
      r: {
        grid: {
          display: true,
          color: "rgba(255,255,255,0.5)",
        },
        ticks: {
          display: false,
          stepSize: 5,
        },
        pointLabels: {
          display: true,
          centerPointLabels: true,
          color: "#FFFFFF",
        },
      },
    },
  };
  const generateChartData = async () => {
    let focus = 0,
      short = 0,
      long = 0;

    Object.keys(data)?.forEach((key) => {
      const i = data[key];
      focus += i.focus / 3600;
      short += i.short / 3600;
      long += i.long / 3600;
    });
    console.log(focus, short, long);
    setDataSetValues([focus, short, long]);
  };
  useEffect(() => {
    generateChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  useEffect(() => {
    const chartData = {
      labels: ["Focus", "Short Break", "LongBreak"],
      datasets: [
        {
          label: "User Data",
          data: [...dataSetValues],
          backgroundColor: [
            "rgba(33, 219, 73, 0.5)",
            "rgba(219, 52, 33, 0.5)",
            "rgba(219, 33, 33, 0.5)",
          ],
          borderColor: [
            "rgba(33, 219, 73, 1)",
            "rgba(219, 52, 33, 1)",
            "rgba(219, 33, 33, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    setChartData(chartData);
  }, [data, dataSetValues]);
  return (
    <>
      <div className="doughnut-chart p-3">
        {chartData && (
          <>
            {idx === 0 && <PolarArea options={options} data={chartData} />}
            {idx === 1 && <SessionTag />}
            {!mobile ? (
              <UserTimeData
                open={open}
                setOpen={setOpen}
                dataSetValues={dataSetValues}
              />
            ) : (
              <UserTimeDataMobile
                open={open}
                setOpen={setOpen}
                dataSetValues={dataSetValues}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default DoughnutChart;
