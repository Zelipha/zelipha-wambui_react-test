import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { setCurrencySign } from "../../Helpers";
import Context from "../../Context";
import "./MinicartFooter.css";

export class MinicartFooter extends Component {
  constructor(props) {
    super(props);

    this.totalPrice = this.totalPrice.bind(this);
  }

  totalPrice = (addedItems, currency) => {
    let total = 0;

    addedItems.forEach((item) => {
      total = total + item[item.length - 2] * item[item.length - 1][currency[1]];
    });
    return total.toFixed(2);
  };

  static contextType = Context;
  render() {
    const { addedItems, currency } = this.context;
    const { isMinicartOpen } = this.props;
    const currencySign = [currency[0]];

    return (
      <div className="minicart-footer">
        <div className="total-container">
          <p className="total-name">Total</p>
          <p className="total-amount">
            {setCurrencySign(currencySign)}
            {this.totalPrice(addedItems, currency)}
          </p>
        </div>
        <div className="minicart-footer-buttons">
          <NavLink className="minicart-button to-bag" to="/cart" onClick={() => isMinicartOpen(false)}>
            VIEW BAG
          </NavLink>
          <NavLink className="minicart-button to-checkout" to="/checkout" onClick={() => isMinicartOpen(false)}>
            CHECK OUT
          </NavLink>
        </div>
      </div>
    );
  }
}

export default MinicartFooter;
