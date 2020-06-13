/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import AboutContext from "../aboutContext";
import ReactQuill from "react-quill";

class ClientList extends Component {
  static contextType = AboutContext;

  modules = {
    toolbar: [["bold", "italic", "underline"], [{ list: "bullet" }], ["link"]]
  };

  formats = ["bold", "italic", "underline", "list", "bullet", "link"];

  clientListChange = (change, key) => {
    let clients = this.context.clients;
    clients[key] = change;
    this.props.toState({ clients });
  };

  render() {
    return (
      <AboutContext.Consumer>
        {context => (
          <div className="clients">
            <h1>
              Clients{" "}
              <span>
                <img
                  className="edit-icon"
                  src={require("../assets/images/edit.svg")}
                  alt="edit"
                  onClick={() =>
                    this.props.toState({
                      edit: "clients"
                    })
                  }
                />
              </span>
            </h1>
            {this.context.edit == "clients" ? (
              <div className="client-list">
                {Object.entries(context.clients).map(category => (
                  <ReactQuill
                    key={category[0]}
                    theme="snow"
                    defaultValue={category[1]}
                    onChange={value =>
                      this.clientListChange(value, category[0])
                    }
                    modules={this.modules}
                    formats={this.formats}
                  />
                ))}
              </div>
            ) : (
              <div className="client-list">
                {Object.entries(context.clients).map(category => (
                  <div
                    key={category[0]}
                    dangerouslySetInnerHTML={{ __html: category[1] }}
                  ></div>
                ))}
              </div>
            )}
            {context.edit == "clients" ? (
              <span className="cancel-submit">
                <input
                  type="button"
                  name="clients-edit-cancel"
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
                    this.props.submitEdit({ clients: this.context.clients })
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

export default ClientList;
