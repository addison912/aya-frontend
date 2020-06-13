import React, { Component } from "react";

class Press extends Component {
  render() {
    return (
      <div className="press">
        <h1>Press</h1>
        <div dangerouslySetInnerHTML={{ __html: this.props.press }}></div>
      </div>
    );
  }
}

export default Press;
