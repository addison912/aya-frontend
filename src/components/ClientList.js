import React, { Component } from "react";

class ClientList extends Component {
  render() {
    return (
      <div className="clients">
        <h1>Clients</h1>
        <div className="client-list">
          {Object.entries(this.props.clients).map(category => (
            <div
              key={category[0]}
              dangerouslySetInnerHTML={{ __html: category[1] }}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

export default ClientList;
