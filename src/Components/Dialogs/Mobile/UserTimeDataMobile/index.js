import React from "react";
import { Drawer } from "@mui/material";
import BlurBox from "../../../Shared/BlurBox";
import { Row, Col } from "react-bootstrap";
import "./user-time-data.css";
const index = ({ open, setOpen, dataSetValues }) => {
  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      anchor="bottom"
      className="transparent"
    >
      <BlurBox classNames="user-time-data-mobile">
        <h5 className="text-white">Since You joined, You've spent</h5>
        <div className="d-flex align-items-end">
          <h1 className="text-white display-4 m-0">
            {new Date(
              (dataSetValues[0] + dataSetValues[1] + dataSetValues[2]) *
                3600 *
                1000
            )
              .toISOString()
              .substr(11, 8)}
          </h1>
          <h3 className="text-white ms-1">Hours</h3>
        </div>
        <h6 className="text-white">
          with us. During which Jupiter completed{" "}
          {(
            ((dataSetValues[0] + dataSetValues[1] + dataSetValues[2]) * 3600) /
            (9 * 3600 + 56 * 60)
          ).toLocaleString("en-US", {
            maximumFractionDigits: 0,
          })}{" "}
          days
        </h6>
        <Row className="mt-4 px-3">
          <Col xs={12} className="p-0">
            <h5 className="text-white">How you spent your time</h5>
          </Col>
          <Row className="py-2 border-bottom border-muted">
            <Col
              xs={6}
              className="text-white d-flex justify-content-start align-items-center p-0"
            >
              Grinding
            </Col>
            <Col
              xs={6}
              className="text-white d-flex justify-content-end align-items-center p-0"
            >
              {new Date(dataSetValues[0] * 3600 * 1000)
                .toISOString()
                .substr(11, 8)}
              <span className="ms-1">Hrs</span>
            </Col>
          </Row>
          <Row className="py-2 border-bottom border-muted">
            <Col
              xs={6}
              className="text-white d-flex justify-content-start align-items-center p-0"
            >
              Getting some air
            </Col>
            <Col
              xs={6}
              className="text-white d-flex justify-content-end align-items-center p-0"
            >
              {new Date(dataSetValues[1] * 3600 * 1000)
                .toISOString()
                .substr(11, 8)}
              <span className="ms-1">Hrs</span>
            </Col>
          </Row>
          <Row className="py-2 border-bottom border-muted">
            <Col
              xs={6}
              className="text-white d-flex justify-content-start align-items-center p-0"
            >
              Resting
            </Col>
            <Col
              xs={6}
              className="text-white d-flex justify-content-end align-items-center p-0"
            >
              {new Date(dataSetValues[2] * 3600 * 1000)
                .toISOString()
                .substr(11, 8)}
              <span className="ms-1">Hrs</span>
            </Col>
          </Row>
        </Row>
      </BlurBox>
    </Drawer>
  );
};

export default index;
