import React, { Component } from "react";
import { domain } from "../config/constants";
import LeftNav from "../components/LeftNav";
import Logo from "../components/Logo";

class Shop extends Component {
  state = {
    shopItems: [],
    show: 10
  };

  getProducts = () => {
    fetch(`${domain}/api/shop/all`)
      .then(res => {
        return res.json();
      })
      .then(shopItems => {
        this.setState({ shopItems });
        // console.log(shopItems);
      });
  };
  showMore = () => {
    let show = this.state.show + 6;
    this.setState({ show });
  };

  componentDidMount() {
    this.getProducts();
    this.props.setLocation("Shop");
  }

  render() {
    return (
      <div className="main">
        <div className="content shop">
          {this.state.shopItems.map((item, i) => (
            <figure
              className={
                (item.availability && item.availability == "0") ||
                item.availability == "sold out"
                  ? "shop-item sold-out"
                  : "shop-item"
              }
              key={i}
            >
              {item.photos[0] && item.photos.length == 1 ? (
                <img src={item.photos[0]} alt={item.name} />
              ) : (
                <h2>No image available</h2>
              )}
              <h1>{item.name}</h1>
              {item.price ? <p>${item.price}</p> : null}
              {item.description ? <p>{item.description}</p> : null}
              {item.availability &&
              !isNaN(parseInt(item.availability)) &&
              parseInt(item.availability) > 0 ? (
                <p>{item.availability} remaining</p>
              ) : null}
              {(item.availability && item.availability == "0") ||
              item.availability == "sold out" ? (
                <button className="checkout-link">Sold Out</button>
              ) : (item.availability &&
                  !isNaN(parseInt(item.availability)) &&
                  parseInt(item.availability) > 0) ||
                item.availability == "unlimited" ? (
                <a href="/">
                  <button className="checkout-link">Buy Now</button>
                </a>
              ) : null}
            </figure>
          ))}

          {/* <div id="page-container">
            <h1>Shop, Coming Soon!</h1>
          </div> */}
        </div>
      </div>
    );
  }
}

export default Shop;
