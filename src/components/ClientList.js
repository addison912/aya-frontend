import React, { Component } from "react";

class ClientList extends Component {
  render() {
    return (
      <div className="clients">
        <h1>Clients</h1>
        <div className="client-list">
          {this.props.clients.map(category => (
            <ul key={category.name}>
              <li>{category.name}</li>
              {category.clients.map(client => (
                <li key={client}>{client}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    );
  }
}

export default ClientList;
