/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useContext, useEffect } from "react";
import AboutContext from "../aboutContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Bio(props) {
  const context = useContext(AboutContext);
  const [value, setValue] = useState(props.bio);
  const [edit, setEdit] = useState(props.edit);

  useEffect(() => {
    setValue(props.bio);
  }, [props.bio]);

  function submitHandler(edit) {
    props.submitEdit(edit);
    setEdit(false);
  }

  const modules = {
    toolbar: [["bold", "italic", "underline"], ["link"]]
  };

  const formats = ["bold", "italic", "underline", "list", "bullet", "link"];

  //   setValue(context.bio);
  return (
    <div className="bio">
      <h1>
        About{" "}
        <span>
          <img
            className="edit-icon"
            src={require("../assets/images/edit.svg")}
            alt="edit"
            onClick={() => setEdit("bio")}
          />
        </span>
      </h1>
      {edit == "bio" ? (
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
        />
      ) : (
        <p dangerouslySetInnerHTML={{ __html: value }}></p>
      )}
      {edit == "bio" ? (
        <span className="cancel-submit">
          <input
            type="button"
            name="bio-edit-cancel"
            className="cancel-button"
            value="Cancel"
            onClick={() => setEdit(false)}
          />

          <input
            type="button"
            name="submitPhoto"
            className="submit-button"
            value="Submit"
            onClick={() => submitHandler({ bio: value })}
          />
        </span>
      ) : null}
    </div>
  );
}

export default Bio;
