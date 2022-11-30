import React, { Component } from "react";
import parse from "html-react-parser";
import update from "react-addons-update";
import { ternaryCheck, setCurrencySign } from "../../Helpers";
import DescriptionAttributes from "./DescriptionAttributes";
import Context from "../../Context";
import "./DescriptionDetails.css";

export class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: [],
    };

    this.defaultAttributes = this.defaultAttributes.bind(this);
    this.setSelected = this.setSelected.bind(this);
  }

  setSelected = (attribute, attributeIndex, item) => {
    this.setState(
      update(this.state, {
        selected: {
          [attributeIndex + 1]: {
            $set: [attribute.name, item.value],
          },
        },
      })
    );
  };

  defaultAttributes = (id, attributes) => {
    let selected = [id];
    attributes.map((attribute) => selected.push([attribute.name, attribute.items[0].value]));
    selected.push(1);
    selected.push(this.props.prices.map((price) => price.amount));
    this.setState({
      selected: selected,
    });
  };

  componentDidMount() {
    const { id, attributes } = this.props;
    this.defaultAttributes(id, attributes);
  }

  static contextType = Context;

  render() {
    const { id, name, brand, prices, attributes, inStock, description } = this.props;
    const { currency, addItem } = this.context;
    const { selected } = this.state;
    const currencySign = [currency[0]];
    const itemPrice = prices[currency[1]].amount;

    return (
      <div className="product-details">
        <p className="product-brand">{brand}</p>
        <p className="product-name">{name}</p>
        <form>
          <DescriptionAttributes id={id} attributes={attributes} name={name} selected={selected} setSelected={this.setSelected} />
          <p className="product-price-title">PRICE:</p>
          <p className="product-price-amount">
            {setCurrencySign(currencySign)}
            {itemPrice}
          </p>
          <button
            disabled={ternaryCheck(inStock, false, true)}
            className={ternaryCheck(inStock, "add-button", "disabled-button")}
            onClick={(event) => {
              event.preventDefault();
              addItem(selected, event);
            }}
          >
            {ternaryCheck(inStock, "ADD TO CART", "OUT OF STOCK")}
          </button>
        </form>
        <div className="product-description">{parse(description)}</div>
      </div>
    );
  }
}

export default Details;
