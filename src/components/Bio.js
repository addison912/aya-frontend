/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import AboutContext from "../aboutContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

class Bio extends Component {
  static contextType = AboutContext;

  render() {
    return (
      <AboutContext.Consumer>
        {context => (
          <div className="bio">
            <h1>
              About{" "}
              <span>
                <img
                  className="edit-icon"
                  src={require("../assets/images/edit.svg")}
                  alt="edit"
                  onClick={() =>
                    this.props.toState({
                      edit: "bio"
                    })
                  }
                />
              </span>
            </h1>
            {this.context.edit == "bio" ? (
              <ReactQuill
                theme="snow"
                value={context.bio}
                onChange={e => this.props.toState({ bio: e.target.value })}
              />
            ) : (
              <p>{context.bio}</p>
            )}
          </div>
        )}
      </AboutContext.Consumer>
    );
  }
}

export default Bio;
