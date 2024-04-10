import React, { Component } from "react";

class ShopItem extends Component {
  render() {
    return (
      <figure
        className={
          (this.props.item.availability &&
            this.props.item.availability == "0") ||
          this.props.item.availability == "sold out" ||
          this.props.item.item_data.ecom_available == false
            ? "shop-item sold-out"
            : "shop-item"
        }
      >
        {this.props.item.photos[0] && this.props.item.photos.length == 1 ? (
          <img
            src={this.props.item.photos[0].url}
            alt={this.props.item.item_data.name}
          />
        ) : (
          <h2>No image available</h2>
        )}
        <h1>{this.props.item.item_data.name}</h1>
        {this.props.item.item_data.variations[0].item_variation_data.price_money
          .amount &&
        Number.isInteger(
          this.props.item.item_data.variations[0].item_variation_data
            .price_money.amount,
        ) ? (
          <p>
            $
            {(
              this.props.item.item_data.variations[0].item_variation_data
                .price_money.amount / 100
            ).toFixed(2)}
          </p>
        ) : null}
        {this.props.item.item_data.description ? (
          <p>{this.props.item.item_data.description}</p>
        ) : null}
        {/* {this.props.item.item_data.availability &&
        !isNaN(parseInt(this.props.item.availability)) &&
        parseInt(this.props.item.availability) > 0 ? (
          <p>{this.props.item.availability} remaining</p>
        ) : null} */}
        {(this.props.item.availability &&
          this.props.item.availability == "0") ||
        this.props.item.availability == "sold out" ||
        this.props.item.item_data.ecom_available == false ? (
          <button className="checkout-link">Sold Out</button>
        ) : this.props.item.item_data.ecom_available ||
          (this.props.item.availability &&
            !isNaN(parseInt(this.props.item.availability)) &&
            parseInt(this.props.item.availability) > 0) ||
          this.props.item.availability == "unlimited" ? (
          <a href={`https://checkout.square.site/buy/${this.props.item.id}`}>
            <button className="checkout-link">Buy Now</button>
          </a>
        ) : null}
      </figure>
    );
  }
}

export default ShopItem;
