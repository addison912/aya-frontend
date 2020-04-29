import React, { Component } from "react";

class BlogTitle extends Component {
  state = {
    showCopied: false
  };

  copyLink = link => {
    navigator.clipboard.writeText(link);
    this.setState({ showCopied: true });
    setTimeout(() => {
      this.setState({ showCopied: false });
    }, 300);
    //
  };
  render() {
    return (
      <h1>
        {this.props.title}{" "}
        <span>
          <button
            className="newsLink"
            onClick={() => {
              this.copyLink(
                `${window.location.origin}/#/news/${this.props.title
                  .replace(/[^A-Z0-9]/gi, "-")
                  .toLowerCase()}`
              );
            }}
          >
            <img
              src={require("../assets/images/link.svg")}
              alt="copy link to clipboard"
            />
            <span
              className={
                this.state.showCopied == false ? "copied" : "hide-copied"
              }
            >
              Link copied
            </span>
          </button>
        </span>
      </h1>
    );
  }
}

export default BlogTitle;
