import React, { Component } from "react";
import { increaseCounter, decreaseCounter } from "../../Helpers";
import Minus from "../../Assets/minus.svg";
import Plus from "../../Assets/plus.svg";
import Context from "../../Context";
import "./CartProductCounter.css";

export class CartProductCounter extends Component {
  static contextType = Context;
  render() {
    const { item, itemIndex } = this.props;
    const { setCounter, removeItem } = this.context;
    const counter = item[item.length - 2];

    return (
      <div className="counter-container">
        <img className="cart-counter-button" src={Plus} alt="plus-box" onClick={() => increaseCounter(counter, itemIndex, setCounter)} />
        <div className="cart-product-counter">{counter}</div>
        <img
          className="cart-counter-button"
          src={Minus}
          alt="minus-box"
          onClick={() => {
            decreaseCounter(counter, itemIndex, setCounter, removeItem);
          }}
        />
      </div>
    );
  }
}

export default CartProductCounter;
