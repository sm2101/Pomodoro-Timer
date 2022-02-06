import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnalyticData } from "../../Firebase/db";
import { setAnalyticData } from "../../App/Actions/analyticActions";
import "./dashboard-index.css";
import Streak from "./Graphs/Streak";
import { trackRecord, summary } from "date-streaks";
import { Container, Row, Col } from "react-bootstrap";
import LineChart from "./Graphs/LineChart";
import DoughnutChart from "./Graphs/DoughnutChart";
import Button from "../Shared/Button";
import TaskData from "./Components/TaskData";
const DashboardIndex = ({ navOpen }) => {
  const dispatch = useDispatch();
  const { userState, analyticData, todoState } = useSelector((state) => ({
    ...state,
  }));
  const [track, setTrack] = useState([]),
    [length, setLength] = useState(7),
    [dateSummary, setDateSummary] = useState({}),
    [timeData, setTimeData] = useState(false);
  const handleGetAnalyticData = () => {
    getAnalyticData({ id: userState?.user?.id })
      .then((res) => {
        setAnalyticData(dispatch, res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (analyticData) {
      const dates = Object.keys(analyticData);
      console.log(dates);
      const track = trackRecord({ dates, length, endDate: new Date() });
      const summaryData = summary({ dates });
      console.log(track);
      const finalTrack = {};
      Object.keys(track).forEach((key) => {
        finalTrack[new Date(key).toDateString()] = track[key];
      });
      setTrack(finalTrack);
      console.log(finalTrack);
      console.log(summaryData);
      setDateSummary(summaryData);
    }
  }, [analyticData, length]);
  useEffect(() => {
    handleGetAnalyticData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="dashboard-index">
      <Streak
        trackRecord={track}
        length={length}
        setLength={setLength}
        analyticData={analyticData}
        dateSummary={dateSummary}
      />
      <Container fluid className="px-md-5">
        <Row className="my-3 justify-content-center ">
          <Col xs={12}>
            <h2 className="charts-title">Your Working Hours</h2>
          </Col>
          <Col lg={8} xs={12} className="line-chart-wrapper pe-lg-4">
            <LineChart data={analyticData} />
          </Col>
          <Col
            lg={4}
            xs={12}
            className={`doughnut-chart-wrapper py-4 neomorph`}
          >
            <DoughnutChart
              data={analyticData}
              open={timeData}
              setOpen={setTimeData}
            />
            <Button
              text={"More"}
              classNames="btn-small transparent chart-know-more-btn text-muted"
              action={() => setTimeData(!timeData)}
            >
              <i className="fas fa-info-circle"></i>
            </Button>
          </Col>
        </Row>
        <Row className="mt-5 pt-4">
          <Col xs={12}>
            <h2 className="charts-title">Stuff to do</h2>
          </Col>
          <TaskData todoState={todoState} navOpen={navOpen} />
        </Row>
      </Container>
    </div>
  );
};

export default DashboardIndex;
