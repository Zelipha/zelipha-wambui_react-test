import React, { Component } from "react";
import { ternaryCheck } from "../../Helpers";
import badgeCart from "../../Assets/badgeCart.svg";
import Context from "../../Context";
import "./ListingPageImage.css";

export class ListingPageImage extends Component {
  constructor(props) {
    super(props);

    this.defaultAttributes = this.defaultAttributes.bind(this);
  }

  defaultAttributes = (selected, attributes, prices) => {
    attributes.map((attribute) => selected.push([attribute.name, attribute.items[0].value]));
    selected.push(1);
    selected.push(prices.map((price) => price.amount));
  };

  static contextType = Context;

  render() {
    const { id, name, gallery, attributes, inStock, prices } = this.props.product;
    const { hover } = this.props;
    const { addItem } = this.context;

    const mainImage = gallery[0];
    const selected = [id];
    const showBadge = inStock && hover;

    this.defaultAttributes(selected, attributes, prices);

    return (
      <>
        <img className={ternaryCheck(inStock, "listing-page-image", "listing-page-image-out")} src={mainImage} alt={name} />
        <div className={ternaryCheck(inStock, "none", "lp-outofstock-sign")}>OUT OF STOCK</div>
        <div
          className={ternaryCheck(showBadge, "add-badge", "none")}
          onClick={() => {
            addItem(selected);
          }}
        >
          <img src={badgeCart} alt="cart" />
        </div>
      </>
    );
  }
}

export default ListingPageImage;
