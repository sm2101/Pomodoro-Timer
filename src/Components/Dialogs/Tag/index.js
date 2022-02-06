import React from "react";
import { Dialog, DialogActions } from "@mui/material";
import Button from "../../Shared/Button";
import BlurBox from "../../Shared/BlurBox";
import "./task.css";
import { TextField } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
const filter = createFilterOptions();
const TagDialog = ({
  open,
  setOpen,
  id,
  tags,
  tag,
  setTag,
  newTag,
  setNewTag,
  onOk,
}) => {
  return (
    <>
      <Dialog open={open}>
        <BlurBox classNames="task-dialog">
          <div id="task-title">Tag your session</div>
          <div className="task-input-wrapper">
            <Autocomplete
              value={tag}
              onChange={(event, newValue) => {
                if (typeof newValue === "string") {
                  setTag(newValue);
                  setNewTag(false);
                } else if (newValue && newValue.inputValue) {
                  // Create a new value from the user input
                  setTag(newValue.inputValue);
                  setNewTag(true);
                } else {
                  setTag(newValue?.tag ? newValue?.tag : "");
                  setNewTag(false);
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some(
                  (option) => inputValue === option.tag
                );
                if (inputValue !== "" && !isExisting) {
                  filtered.push({
                    inputValue,
                    tag: `Add "${inputValue}"`,
                  });
                }

                return filtered;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              id="free-solo-with-text-demo"
              options={tags}
              getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === "string") {
                  return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                  return option.inputValue;
                }
                // Regular option
                return option.tag;
              }}
              renderOption={(props, option) => (
                <li {...props}>
                  {typeof option === "string" ? option : option.tag}
                </li>
              )}
              freeSolo
              renderInput={(params) => (
                <div className="styled-input-wrapper">
                  <label className="styled-label dark lg">Tag</label>
                  <TextField
                    {...params}
                    variant="standard"
                    className="styled-input dark lg text-white"
                  />
                </div>
              )}
            />
          </div>
          <DialogActions>
            <Button classNames="success-btn transparent" action={onOk}>
              <i className="fas fa-check"></i>
            </Button>
          </DialogActions>
        </BlurBox>
      </Dialog>
    </>
  );
};

export default TagDialog;
