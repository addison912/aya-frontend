import React, { Component } from "react";

class ShopItem extends Component {
  render() {
    return (
      <figure
        className={
          (this.props.item.availability &&
            this.props.item.availability == "0") ||
          this.props.item.availability == "sold out"
            ? "shop-item sold-out"
            : "shop-item"
        }
      >
        {this.props.item.photos[0] && this.props.item.photos.length == 1 ? (
          <img src={this.props.item.photos[0]} alt={this.props.item.name} />
        ) : (
          <h2>No image available</h2>
        )}
        <h1>{this.props.item.name}</h1>
        {this.props.item.price ? <p>${this.props.item.price}</p> : null}
        {this.props.item.description ? (
          <p>{this.props.item.description}</p>
        ) : null}
        {this.props.item.availability &&
        !isNaN(parseInt(this.props.item.availability)) &&
        parseInt(this.props.item.availability) > 0 ? (
          <p>{this.props.item.availability} remaining</p>
        ) : null}
        {(this.props.item.availability &&
          this.props.item.availability == "0") ||
        this.props.item.availability == "sold out" ? (
          <button className="checkout-link">Sold Out</button>
        ) : (this.props.item.availability &&
            !isNaN(parseInt(this.props.item.availability)) &&
            parseInt(this.props.item.availability) > 0) ||
          this.props.item.availability == "unlimited" ? (
          <a href="/">
            <button className="checkout-link">Buy Now</button>
          </a>
        ) : null}
      </figure>
    );
  }
}

export default ShopItem;
