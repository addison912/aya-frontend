/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import AboutContext from "../aboutContext";

class Contact extends Component {
  static contextType = AboutContext;
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
            <ul>
              {context.contact.map((contact, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: contact }}></li>
              ))}
            </ul>
          </div>
        )}
      </AboutContext.Consumer>
    );
  }
}

export default Contact;
