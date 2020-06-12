import React, { Component } from "react";

class Press extends Component {
  render() {
    return (
      <div className="press">
        <h1>Press</h1>
        <ul>
          {this.props.press.map((press, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: press }}></li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Press;
