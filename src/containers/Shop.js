import React, { Component } from "react";
import { domain } from "../config/constants";
import ShopItem from "../components/ShopItem";
import ShopInstructions from "../components/ShopInstructions";

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
        try {
          shopItems.sort(function(a, b) {
            return (
              a.item_data.variations[0].item_variation_data.ordinal -
              b.item_data.variations[0].item_variation_data.ordinal
            );
          });
        } catch (err) {
          console.log(err);
        }

        console.log(shopItems);
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
          <ShopInstructions />
          {this.state.shopItems.map((item, i) => (
            <ShopItem key={i} item={item}></ShopItem>
          ))}
        </div>
      </div>
    );
  }
}

export default Shop;
