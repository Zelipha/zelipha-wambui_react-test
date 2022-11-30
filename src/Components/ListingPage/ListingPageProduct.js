import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import ListingPageImage from "./ListingPageImage";
import ListingPageDetails from "./ListingPageDetails";
import Context from "../../Context";
import "./ListingPageProduct.css";

export class ListingPageProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
    };

    this.hoverOver = this.hoverOver.bind(this);
    this.hoverOut = this.hoverOut.bind(this);
  }

  hoverOver = () => {
    this.setState({
      hover: true,
    });
  };

  hoverOut = () => {
    this.setState({
      hover: false,
    });
  };

  static contextType = Context;
  render() {
    const { hover } = this.state;
    const { category, product } = this.props;
    return (
      <div className="listing-page-product" key={product.name} onMouseOver={this.hoverOver} onMouseOut={this.hoverOut}>
        <NavLink className="listing-page-product-link" to={`/${category}/${product.id}`}></NavLink>
        <ListingPageImage product={product} hover={hover} />
        <ListingPageDetails category={category} product={product} />
      </div>
    );
  }
}

export default ListingPageProduct;
