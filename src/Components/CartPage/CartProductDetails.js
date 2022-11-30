import React, { Component } from "react";
import { ternaryCheck, setCurrencySign, isChecked, isAttributeColor } from "../../Helpers";
import Context from "../../Context";
import "./CartProductDetails.css";

export class CartProductDetails extends Component {
  static contextType = Context;
  render() {
    const { name, brand, prices, attributes, itemIndex } = this.props;
    const { currency, switchAttributes, addedItems } = this.context;
    const currencySign = [currency[0]];
    const itemPrice = prices[currency[1]].amount;

    return (
      <div className="cart-product-details">
        <p className="cart-product-brand">{brand}</p>
        <p className="cart-product-name">{name}</p>
        <p className="cart-product-price">
          {setCurrencySign(currencySign)}
          {itemPrice}
        </p>

        {attributes.map((attribute, attributeIndex) => {
          const attributeKind = attribute.name === "Color";
          return (
            <React.Fragment key={`${attribute.type}:${attributeIndex}`}>
              <p className="cart-attribute-name">{attribute.name}:</p>
              <div className="cart-product-attributes">
                {attribute.items.map((attributeItem) => (
                  <React.Fragment key={`${attribute.name}:${attributeItem.value}`}>
                    <input
                      checked={isChecked(attributeIndex, attributeItem, addedItems, itemIndex)}
                      type="radio"
                      name={`${name}:${attribute.name}:${itemIndex}`}
                      value={attributeItem.value}
                      id={`${name}:${attribute.name}:${attributeItem.value}:${itemIndex}`}
                      onChange={() => {
                        switchAttributes(itemIndex, attributeIndex, attributeItem);
                      }}
                    />
                    <label
                      htmlFor={`${name}:${attribute.name}:${attributeItem.value}:${itemIndex}`}
                      className={ternaryCheck(attributeKind, "color-label", "normal-label")}
                      style={{
                        backgroundColor: `${isAttributeColor(attributeKind, attributeItem)}`,
                      }}
                    >
                      {ternaryCheck(attributeKind, "", attributeItem.value)}
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    );
  }
}

export default CartProductDetails;
