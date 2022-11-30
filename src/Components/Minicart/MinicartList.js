import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { Query } from "@apollo/client/react/components";
import MinicartProductDetails from "./MinicartProductDetails";
import MinicartProductCounter from "./MinicartProductCounter";
import DESCRIPTION from "../../Queries/DescriptionPageQuery";
import Context from "../../Context";
import "./MinicartList.css";

export class MinicartList extends Component {
  constructor(props) {
    super(props);

    this.minicartItem = this.minicartItem.bind(this);
  }

  minicartItem = (loading, error, data, item, itemIndex) => {
    if (loading) return "loading...";
    if (error) return "error...";
    if (data) {
      if (!data.product) {
        return <Navigate to="/404" />;
      }
      const { gallery, name, brand, prices, attributes } = data.product;
      const itemImage = gallery[0];

      return (
        <div className="minicart-product">
          <MinicartProductDetails item={item} name={name} brand={brand} prices={prices} attributes={attributes} itemIndex={itemIndex} />
          <MinicartProductCounter itemIndex={itemIndex} item={item} />
          <img className="minicart-image" src={itemImage} alt={name} key={name} />
        </div>
      );
    }
  };

  static contextType = Context;
  render() {
    const { addedItems } = this.context;
    return (
      <div className="minicart-list">
        {addedItems.map((item, itemIndex) => {
          const productId = item[0];

          return (
            <Query key={`${productId}:${itemIndex}`} query={DESCRIPTION} variables={{ productID: productId }}>
              {({ loading, data, error }) => this.minicartItem(loading, error, data, item, itemIndex)}
            </Query>
          );
        })}
      </div>
    );
  }
}

export default MinicartList;
