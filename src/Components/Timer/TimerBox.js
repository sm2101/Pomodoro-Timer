import React from "react";
import BlurBox from "../Shared/BlurBox";
import { useSelector, useDispatch } from "react-redux";
import { changeCurrent } from "../../App/Actions/counterActions";
import Tabs from "./Tabs";
const TimerBox = () => {
  const { counterState } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const changeTabs = (tab) => {
    changeCurrent(dispatch, tab);
  };
  return (
    <BlurBox id="timer-box" classNames="timer-box">
      <Tabs tab={counterState.current} changeTabs={changeTabs} />
    </BlurBox>
  );
};

export default TimerBox;
