import React, { Component } from "react";
import { domain } from "../config/constants";
import ShopItem from "../components/ShopItem";

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
        shopItems.sort(function(a, b) {
          return a.order - b.order;
        });
        this.setState({ shopItems });
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
            <ShopItem key={i} item={item}></ShopItem>
          ))}
        </div>
      </div>
    );
  }
}

export default Shop;
