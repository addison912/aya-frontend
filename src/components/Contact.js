import React, { Component } from "react";

class Contact extends Component {
  render() {
    return (
      <div className="contact-info">
        <h1>Contact</h1>
        <ul>
          {this.props.contact.map((contact, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: contact }}></li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Contact;
