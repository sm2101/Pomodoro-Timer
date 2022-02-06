import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useMediaQuery } from "@mui/material";
import { Bar } from "react-chartjs-2";
import "./graph-style.css";
import { Select, MenuItem } from "@mui/material";
import Button from "../../Shared/Button";
const LineChart = ({ data }) => {
  const [length, setLength] = useState(30),
    [labels, setLabels] = useState([]),
    [chartData, setChartData] = useState(null),
    [singleDay, setSingleDay] = useState(false),
    [singleDayChartData, setSingleDayChartData] = useState(null),
    [singleDayLabels] = useState([
      "00:00",
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
      "24:00",
    ]);

  const mobile = useMediaQuery("(max-width:800px)");
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    hover: {
      mode: "nearest",
    },
    events: ["click", "mousemove"],
    onClick: function (event, element) {
      if (element.length) {
        let focus = new Array(24).fill(0),
          short = new Array(24).fill(0),
          long = new Array(24).fill(0);
        const date = labels[element[0].index];
        const singleDayData = data[date].data;
        singleDayData.forEach((item) => {
          const start = new Date(`1/1/1999 ${item.startTime}`)
            .getHours()
            .toLocaleString("en-US", { minimumIntegerDigits: 2 });
          const end = (
            new Date(`1/1/1999 ${item.endTime}`).getHours() + 1
          ).toLocaleString("en-US", { minimumIntegerDigits: 2 });
          for (let i = start; i <= end; i++) {
            const label = `${i}:00`;
            const idx = singleDayLabels.indexOf(label);
            focus[idx] += item.focus / 3600;
            short[idx] += item.short / 3600;
            long[idx] += item.long / 3600;
          }
        });
        setSingleDay({ date, focus, short, long });
      }
    },
    plugins: {
      legend: {
        display: !mobile,
        position: "top",
        labels: {
          color: "white",
        },
      },
      tooltip: {
        usePointStyle: false,
        position: "nearest",
      },
    },
    scales: {
      y: {
        stacked: true,
        grid: {
          display: false,
          drawBorder: !mobile,
          borderColor: "rgba(255, 255, 255, 0.3)",
          color: "rgba(255, 255, 255, 0.3)",
        },
        ticks: {
          color: "white",
          display: true,
        },
        title: {
          display: !mobile,
          text: "Hours",
          color: "white",
          font: {
            size: 20,
            style: "normal",
            lineHeight: 1.2,
          },
        },
      },
      x: {
        stacked: true,
        grid: {
          display: false,
          drawBorder: true,
          borderColor: "rgba(255, 255, 255, 0.3)",
          color: "rgba(255, 255, 255, 0.3)",
        },
        ticks: {
          color: "white",
          display: !mobile,
        },
      },
    },
  };
  const singleDayoptions = {
    responsive: true,
    hover: {
      mode: "nearest",
    },
    plugins: {
      legend: {
        display: !mobile,
        position: "top",
        labels: {
          color: "white",
        },
      },
      tooltip: {
        usePointStyle: false,
        position: "nearest",
      },
    },
    scales: {
      y: {
        stacked: true,
        grid: {
          display: false,
          drawBorder: !mobile,
          borderColor: "rgba(255, 255, 255, 0.3)",
          color: "rgba(255, 255, 255, 0.3)",
        },
        ticks: {
          color: "white",
          display: true,
        },
        title: {
          display: !mobile,
          text: "Hours",
          color: "white",
          font: {
            size: 20,
            style: "normal",
            lineHeight: 1.2,
          },
        },
      },
      x: {
        stacked: true,
        grid: {
          display: false,
          drawBorder: true,
          borderColor: "rgba(255, 255, 255, 0.3)",
          color: "rgba(255, 255, 255, 0.3)",
        },
        ticks: {
          color: "white",
          display: !mobile,
        },
      },
      xAxes: [
        {
          categoryPercentage: 1.0,
          barPercentage: 1.0,
        },
      ],
    },
  };
  useEffect(() => {
    const dateLabels = [...Array(length)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toDateString();
    });
    console.log(dateLabels);
    setLabels(dateLabels.reverse());
  }, [data, length]);
  useEffect(() => {
    const chartData = {
      labels: labels.map((item) => {
        const dateArr = new Date(item).toLocaleDateString().split("/");
        dateArr.pop();
        return dateArr.join(" - ");
      }),
      datasets: [
        {
          label: "Focus",
          fill: true,
          borderColor: "rgb(33, 219, 73)",
          backgroundColor: "rgba(33, 219, 73, 0.5)",
          data: labels.map((date) =>
            data ? data[date]?.focus / 3600 || 0 : 0
          ),
          borderRadius: 3,
        },
        {
          label: "Short Breaks",
          fill: true,
          borderColor: "rgb(219, 52, 33)",
          backgroundColor: "rgba(219, 52, 33, 0.5)",
          data: labels.map((date) =>
            data ? data[date]?.short / 3600 || 0 : 0
          ),
          borderRadius: 3,
        },
        {
          label: "Long Breaks",
          fill: true,
          borderColor: "rgb(219, 33, 33",
          backgroundColor: "rgba(219, 33, 33, 0.5)",
          data: labels.map((date) => (data ? data[date]?.long / 3600 || 0 : 0)),
          borderRadius: 3,
        },
      ],
    };
    setChartData(chartData);
  }, [data, labels]);
  useEffect(() => {
    if (singleDay) {
      const chartData = {
        labels: singleDayLabels,
        datasets: [
          {
            label: "Focus",
            fill: true,
            borderColor: "rgb(33, 219, 73)",
            backgroundColor: "rgba(33, 219, 73, 0.5)",
            data: singleDay.focus,
            barPercentage: 1,
          },
          {
            label: "Short Breaks",
            fill: true,
            borderColor: "rgb(219, 52, 33)",
            backgroundColor: "rgba(219, 52, 33, 0.5)",
            data: singleDay.short,
            barPercentage: 1,
          },
          {
            label: "Long Breaks",
            fill: true,
            borderColor: "rgb(219, 33, 33",
            backgroundColor: "rgba(219, 33, 33, 0.5)",
            data: singleDay.long,
            barPercentage: 1,
          },
        ],
      };
      setSingleDayChartData(chartData);
    }
  }, [singleDay, singleDayLabels]);

  return (
    <div className="line-chart">
      <div className="streak-selected">
        {!singleDay ? (
          <div>
            <span>Last</span>
            <Select
              labelId="time-frame-select"
              id="time-frame-select"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              variant="standard"
            >
              {[7, 10, 30, 90, 210, 365].map((item) => (
                <MenuItem value={item} key={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            <span>Days</span>
          </div>
        ) : (
          <Button
            classNames="transparent btn-small"
            action={() => setSingleDay(null)}
            text={singleDay.date}
          >
            <i className="fas fa-arrow-left"></i>
          </Button>
        )}
      </div>
      {!singleDay && chartData && <Bar options={options} data={chartData} />}
      {singleDay && singleDayChartData && (
        <Bar options={singleDayoptions} data={singleDayChartData} />
      )}
    </div>
  );
};

export default LineChart;
