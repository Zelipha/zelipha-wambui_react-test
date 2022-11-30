import React, { Component } from "react";
import { ternaryCheck, setCurrencySign, itemCounter } from "../../Helpers";
import ArrowUp from "../../Assets/arrowDown.svg";
import ArrowDown from "../../Assets/arrowUp.svg";
import Cart from "../../Assets/cart.svg";
import Context from "../../Context";
import "./IconContainer.css";

export class IconContainer extends Component {
  static contextType = Context;
  render() {
    const { currency, addedItems } = this.context;
    const { isMinicartOpen, isCurrenciesOpen, currenciesOpen, currenciesRef, minicartRef } = this.props;

    const currencySign = [currency[0]];

    return (
      <div className="icon-container" ref={this.currencyIcon}>
        <div className="currency-icon-container" onClick={() => isCurrenciesOpen(true)} ref={currenciesRef}>
          {setCurrencySign(currencySign)}
          <img src={ternaryCheck(currenciesOpen, ArrowDown, ArrowUp)} alt={"arrow"} />
        </div>
        <div className="cart-icon-container" onClick={() => isMinicartOpen(true)} ref={minicartRef}>
          <img src={Cart} alt="cart" className="cart-icon" />
          <div className="cart-item-counter">{itemCounter(addedItems)}</div>
        </div>
      </div>
    );
  }
}

export default IconContainer;
