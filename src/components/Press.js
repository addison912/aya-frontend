/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import AboutContext from "../aboutContext";

class Press extends Component {
  static contextType = AboutContext;
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
            <ul>
              {context.press.map((press, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: press }}></li>
              ))}
            </ul>
          </div>
        )}
      </AboutContext.Consumer>
    );
  }
}

export default Press;
