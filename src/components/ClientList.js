/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import AboutContext from "../aboutContext";

class ClientList extends Component {
  static contextType = AboutContext;
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
            {this.context.edit == "clients" ? null : (
              <div className="client-list">
                {context.clients.map(category => (
                  <ul key={category.name}>
                    <li>{category.name}</li>
                    {category.clients.map(client => (
                      <li key={client}>{client}</li>
                    ))}
                  </ul>
                ))}
              </div>
            )}
          </div>
        )}
      </AboutContext.Consumer>
    );
  }
}

export default ClientList;
