import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BlurBox from "../../../../../Shared/BlurBox";
import Button from "../../../../../Shared/Button";
import { SwipeableDrawer } from "@mui/material";
import { toggleDrawer } from "../../../../../../App/Actions/notepadActions";
import "./mobile-notepad.css";
import { setIdeasOrThoughts } from "../../../../../../Firebase/db";
import { MentionsInput, Mention } from "react-mentions";
const MobileNotepad = () => {
  const [ideasOrThoughts, setLocalIdeasOrThoughts] = useState(""),
    [ideaLoading, setIdeaLoading] = useState(false);
  const { notepadState, userState } = useSelector((state) => ({
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
  const handleClose = () => {
    if (notepadState) {
      toggleDrawer(dispatch);
    }
  };
  useEffect(() => {
    if (!notepadState) {
      if (ideasOrThoughts !== "") {
        handleSetIdeasOrThoughts();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notepadState]);
  return (
    <>
      <SwipeableDrawer
        open={notepadState}
        onClose={handleClose}
        anchor="top"
        className="notepad-drawer"
      >
        <BlurBox classNames="notepad-wrapper-mobile">
          <div className="notepad-title">
            Ideas - Thoughts.txt{" "}
            {ideaLoading && (
              <span className="loading-text">
                <i className="fas fa-cloud-download-alt"></i>{" "}
                <span>Saving...</span>
              </span>
            )}
          </div>
          <div className="notepad-mobile" id="notepad-idea">
            <MentionsInput
              value={ideasOrThoughts}
              onChange={(e, value) => {
                setLocalIdeasOrThoughts(value);
              }}
              className="idea-thought-input"
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
      </SwipeableDrawer>
    </>
  );
};

export default MobileNotepad;
