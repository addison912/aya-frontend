/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";

class MobileInfo extends Component {
  render() {
    return (
      <div
        className={this.props.mobileInfo ? "mobile-info" : "mobile-info hide"}
        onClick={this.props.toggleMobileInfo}
      >
        <span>{this.props.photo.caption}</span>
      </div>
    );
  }
}

export default MobileInfo;
