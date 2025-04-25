import React, { Component } from "react";

class Contact extends Component {
  render() {
    return (
      <div className="contact-info">
        <h1>Contact</h1>
        <div dangerouslySetInnerHTML={{ __html: this.props.contact }}></div>
      </div>
    );
  }
}

export default Contact;
