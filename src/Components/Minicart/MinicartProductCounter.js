import React, { Component } from "react";
import { increaseCounter, decreaseCounter } from "../../Helpers";
import miniPlus from "../../Assets/miniPlus.svg";
import miniMinus from "../../Assets/miniMinus.svg";
import Context from "../../Context";
import "./MinicartProductCounter.css";

export class MinicartProductCounter extends Component {
  static contextType = Context;
  render() {
    const { item, itemIndex } = this.props;
    const { setCounter, removeItem } = this.context;
    const counter = item[item.length - 2];

    return (
      <div className="minicart-counter-container">
        <img className="minicart-counter-button" src={miniPlus} alt="plus-box" onClick={() => increaseCounter(counter, itemIndex, setCounter)} />
        <div className="minicart-product-counter">{counter}</div>
        <img
          className="minicart-counter-button"
          src={miniMinus}
          alt="minus-box"
          onClick={() => {
            decreaseCounter(counter, itemIndex, setCounter, removeItem);
          }}
        />
      </div>
    );
  }
}

export default MinicartProductCounter;
