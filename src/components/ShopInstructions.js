import React, { Component } from "react";

export class ShopInstructions extends Component {
  render() {
    return (
      <div className="instructions">
        <h1>Instructions</h1>

        <ol>
          <li>
            Navigate to{" "}
            <a href="squareup.com/dashboard/items/library">
              squareup.com/dashboard/items/library
            </a>
          </li>
          <li>Click “Create an item”</li>
          <li>Enter the product name, description and price.</li>
          <li>
            To add inventory, click on “stock”, then enable tracking. Select a
            stock action. You can select “Stock received” to add inventory.
          </li>
          <li>
            At the bottom of the screen, toggle the “Online Checkout” option,
            then click save.
          </li>
          <li>
            Next, you’ll need to navigate to “Online Store” in order to add a
            photo and make the item visible on your website. Click “Items” in
            the top left to expand the left hand navigation, then click “Online
            Store”. Then navigate to “Item Library”. (here’s a direct link:
            <a href="https://www.weebly.com/app/store/users/132689488/sites/329758340685607050/#/store/products">
              https://www.weebly.com/app/store/users/132689488/sites/329758340685607050/#/store/products
            </a>
            )
          </li>
          <li>
            Select the item you just created. Add a photo, and select “Visible”,
            then save.
          </li>
          <li>
            The item should now be visible on the Shop page of your website.
          </li>
        </ol>
      </div>
    );
  }
}

export default ShopInstructions;
