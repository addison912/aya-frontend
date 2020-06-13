/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import AboutContext from "../aboutContext";
import ReactQuill from "react-quill";

class Contact extends Component {
  static contextType = AboutContext;

  modules = {
    toolbar: [["bold", "italic", "underline"], [{ list: "bullet" }], ["link"]]
  };

  formats = ["bold", "italic", "underline", "list", "bullet", "link"];

  render() {
    return (
      <AboutContext.Consumer>
        {context => (
          <div className="contact-info">
            <h1>
              Contact{" "}
              <span>
                <img
                  className="edit-icon"
                  src={require("../assets/images/edit.svg")}
                  alt="edit"
                  onClick={() =>
                    this.props.toState({
                      edit: "contact"
                    })
                  }
                />
              </span>
            </h1>
            {context.edit == "contact" ? (
              <ReactQuill
                theme="snow"
                defaultValue={context.contact}
                onChange={value => this.props.toState({ contact: value })}
                modules={this.modules}
                formats={this.formats}
              />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: context.contact }}></div>
            )}
            {context.edit == "contact" ? (
              <span className="cancel-submit">
                <input
                  type="button"
                  name="contact-edit-cancel"
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
                    this.props.submitEdit({ contact: this.context.contact })
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

export default Contact;
