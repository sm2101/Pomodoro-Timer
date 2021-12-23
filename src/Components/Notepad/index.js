import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFocus } from "../../App/Actions/focusActions";
import BlurBox from "../Shared/BlurBox";
import Button from "../Shared/Button";
import "./notepad.css";
import { setIdeasOrThoughts } from "../../Firebase/db";
import { MentionsInput, Mention } from "react-mentions";
const Notepad = () => {
  const [ideasOrThoughts, setLocalIdeasOrThoughts] = useState(""),
    [ideaLoading, setIdeaLoading] = useState(false);
  const { counterState, notepadState, userState } = useSelector((state) => ({
    ...state,
  }));
  const dispatch = useDispatch();
  const handleSetIdeasOrThoughts = () => {
    setIdeaLoading(true);
    setIdeasOrThoughts(userState?.user?.id, ideasOrThoughts.split("\n")).then(
      (res) => {
        setIdeaLoading(false);
        setLocalIdeasOrThoughts("");
      }
    );
  };

  useEffect(() => {
    if (!counterState.isActive || !notepadState) {
      if (ideasOrThoughts !== "") {
        handleSetIdeasOrThoughts();
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
            Ideas - Thoughts.txt{" "}
            {ideaLoading && (
              <span className="loading-text">
                <i className="fas fa-cloud-download-alt"></i>{" "}
                <span>Saving...</span>
              </span>
            )}
          </div>
          <div className="notepad" id="notepad-idea">
            <MentionsInput
              value={ideasOrThoughts}
              onChange={(e, value) => {
                setLocalIdeasOrThoughts(value);
              }}
              className="idea-thought-input"
              onFocus={() => toggleFocus(dispatch)}
              onBlur={() => toggleFocus(dispatch)}
              placeholder="/* Notedown your thoughts/ideas here, use #idea or #thought before sentence to tag that sentece */"
            >
              <Mention
                trigger="#"
                data={[
                  {
                    id: "idea",
                    display: "#idea",
                  },
                  {
                    id: "thought",
                    display: "#thought",
                  },
                ]}
                displayTransform={(id) => `#${id}`}
              />
            </MentionsInput>
          </div>
          <div className="notepad-action">
            <Button
              text="Save"
              classNames="transparent"
              action={handleSetIdeasOrThoughts}
              disabled={ideasOrThoughts === ""}
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
