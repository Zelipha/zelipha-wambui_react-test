import React, { Component } from "react";
import { ternaryCheck, setCurrencySign } from "../../Helpers";
import Context from "../../Context";
import "./ListingPageDetails.css";

export class ListingPageDetails extends Component {
  static contextType = Context;
  render() {
    const { currency } = this.context;
    const { brand, name, prices, inStock } = this.props.product;
    const currencySign = [currency[0]];
    const itemPrice = prices[currency[1]].amount;

    return (
      <div className={ternaryCheck(inStock, "listing-page-details", "listing-page-details-out")}>
        <p className="listing-page-name">
          {brand} {name}
        </p>

        <p className="listing-page-price">
          {setCurrencySign(currencySign)}
          {itemPrice}
        </p>
      </div>
    );
  }
}

export default ListingPageDetails;
