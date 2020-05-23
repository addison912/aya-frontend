import React, { Component } from "react";
import { domain } from "../config/constants";

class NotFound extends Component {
  state = {
    images: [
      "AyaBrackettJellyDesserts.jpg",
      "AyaBrackettKetchup.jpg",
      "AyaBrackettBeachPicnic.jpg"
    ]
  };
  render() {
    return (
      <div className="main">
        <div className="content">
          <div className="page-container">
            <div className="not-found-container">
              <h1 id="404">
                Oops! We couldn&rsquo;t find the page you&rsquo;re looking for.
              </h1>
              <figure className="image-wrapper">
                <img
                  src={`${domain}/uploads/photos/Still_Life/Soiled/thumbs/${
                    this.state.images[Math.floor(Math.random() * 3)]
                  }`}
                  alt="Oops"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
