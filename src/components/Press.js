/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import AboutContext from "../aboutContext";
import ReactQuill from "react-quill";

class Press extends Component {
  static contextType = AboutContext;
  modules = {
    toolbar: [["bold", "italic", "underline"], [{ list: "bullet" }], ["link"]]
  };

  formats = ["bold", "italic", "underline", "list", "bullet", "link"];
  render() {
    return (
      <AboutContext.Consumer>
        {context => (
          <div className="press">
            <h1>
              Press{" "}
              <span>
                <img
                  className="edit-icon"
                  src={require("../assets/images/edit.svg")}
                  alt="edit"
                  onClick={() =>
                    this.props.toState({
                      edit: "press"
                    })
                  }
                />
              </span>
            </h1>
            {context.edit == "press" ? (
              <ReactQuill
                theme="snow"
                defaultValue={context.press}
                onChange={value => this.props.toState({ press: value })}
                modules={this.modules}
                formats={this.formats}
              />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: context.press }}></div>
            )}
            {context.edit == "press" ? (
              <span className="cancel-submit">
                <input
                  type="button"
                  name="press-edit-cancel"
                  className="cancel-button"
                  value="Cancel"
                  onClick={() =>
                    this.props.toState({
                      edit: false
                    })
                  }
                />

                <input
                  type="button"
                  name="submitPhoto"
                  className="submit-button"
                  value="Submit"
                  onClick={() =>
                    this.props.submitEdit({ press: this.context.press })
                  }
                />
              </span>
            ) : null}
          </div>
        )}
      </AboutContext.Consumer>
    );
  }
}

export default Press;
