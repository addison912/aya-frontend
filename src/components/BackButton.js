/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";

class BackButton extends Component {
  render() {
    return (
      // <div
      //   className="back-button"
      //   onClick={() => this.props.categoryChangeHandler(this.props.category)}
      // >
      //   <span>
      //     <img
      //       src={require("../assets/images/prev-arrow.svg")}
      //       alt="previous"
      //       className="index-arrow"
      //     />
      //   </span>{" "}
      //   <span>BACK TO {this.props.category}</span>
      // </div>
      <div
        className="icon-wrapper"
        onClick={() => this.props.categoryChangeHandler(this.props.category)}
      >
        <img
          src={require("../assets/images/back-nav.svg")}
          alt="previous"
          className="index-arrow"
        />
        <span>Back</span>
      </div>
    );
  }
}

export default BackButton;
