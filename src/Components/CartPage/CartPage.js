import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { Query } from "@apollo/client/react/components";
import DESCRIPTION from "../../Queries/DescriptionPageQuery";
import CartProductDetails from "./CartProductDetails";
import CartProductCounter from "./CartProductCounter";
import CartProductImages from "./CartProductImages";
import Context from "../../Context";
import "./CartPage.css";

export class CartPage extends Component {
  constructor(props) {
    super(props);

    this.cartItem = this.cartItem.bind(this);
  }

  cartItem = (loading, error, data, item, itemIndex) => {
    if (loading) return "loading...";
    if (error) return "error...";
    if (data) {
      if (!data.product) {
        return <Navigate to="/404" />;
      }
      const { gallery, name, brand, prices, attributes } = data.product;
      return (
        <div className="cart-product">
          <CartProductDetails item={item} name={name} brand={brand} prices={prices} attributes={attributes} itemIndex={itemIndex} />
          <CartProductCounter item={item} itemIndex={itemIndex} />
          <CartProductImages gallery={gallery} name={name} />
        </div>
      );
    }
  };

  static contextType = Context;
  render() {
    const { addedItems } = this.context;
    return (
      <div className="cart-page">
        <h1 className="cart-page-header">CART</h1>
        {addedItems.map((item, itemIndex) => {
          const productId = item[0];
          return (
            <Query key={`${productId}:${itemIndex}`} query={DESCRIPTION} variables={{ productID: productId }}>
              {({ loading, data, error }) => this.cartItem(loading, error, data, item, itemIndex)}
            </Query>
          );
        })}
      </div>
    );
  }
}

export default CartPage;
