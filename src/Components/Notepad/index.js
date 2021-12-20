import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BlurBox from "../Shared/BlurBox";
import Button from "../Shared/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "./notepad.css";
import { setThoughts, setIdeas } from "../../Firebase/db";
const Notepad = () => {
  const [thoughts, setLocalThoughts] = useState(""),
    [ideas, setLocalIdeas] = useState(""),
    [ideaLoading, setIdeaLoading] = useState(false),
    [thoughtLoading, setThoughtLoading] = useState(false);
  const { counterState, notepadState, userState } = useSelector((state) => ({
    ...state,
  }));
  const handleSetThoughts = () => {
    setThoughtLoading(true);
    setThoughts(userState?.user?.id, thoughts).then((res) => {
      setLocalThoughts("");
      setThoughtLoading(false);
    });
  };
  const handleSetIdeas = () => {
    setIdeaLoading(true);
    setIdeas(userState?.user?.id, ideas).then((res) => {
      setIdeaLoading(false);
      setLocalIdeas("");
    });
  };

  useEffect(() => {
    if (!counterState.isActive || !notepadState) {
      if (ideas !== "") {
        handleSetIdeas();
      }
      if (thoughts !== "") {
        handleSetThoughts();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counterState.isActive, notepadState]);
  return (
    <>
      <div
        className={`notepad-drawer ${
          counterState.isActive || notepadState ? "open" : "close"
        }`}
      >
        <BlurBox classNames="notepad-wrapper">
          <div className="notepad-title">
            Ideas.txt{" "}
            {ideaLoading && (
              <span className="loading-text">
                <i className="fas fa-cloud-download-alt"></i>{" "}
                <span>Saving...</span>
              </span>
            )}
          </div>
          <div className="notepad" id="notepad-idea">
            <ReactQuill
              theme="bubble"
              placeholder="/* Use this notepad to jot down any ideas you get */"
              value={ideas}
              onChange={(value) => {
                setLocalIdeas(value);
              }}
            />
          </div>
          <div className="notepad-action">
            <Button
              text="Save"
              classNames="transparent"
              action={handleSetIdeas}
              disabled={ideas === ""}
            >
              <i className="fas fa-cloud-download-alt"></i>
            </Button>
          </div>
        </BlurBox>
        <BlurBox classNames="notepad-wrapper">
          <div className="notepad-title">
            Thoughts.txt{" "}
            {thoughtLoading && (
              <span className="loading-text">
                <i className="fas fa-cloud-download-alt"></i>{" "}
                <span>Saving...</span>
              </span>
            )}
          </div>
          <div className="notepad" id="notepad-thoughts">
            <ReactQuill
              theme="bubble"
              placeholder="/* Use this notepad to jot down any distracting thoughts you may have */"
              value={thoughts}
              onChange={(value) => {
                setLocalThoughts(value);
              }}
            />
          </div>
          <div className="notepad-action">
            <Button
              text="Save"
              classNames="transparent"
              action={handleSetThoughts}
              disabled={thoughts === ""}
            >
              <i className="fas fa-cloud-download-alt"></i>
            </Button>
          </div>
        </BlurBox>
      </div>
    </>
  );
};

export default Notepad;
