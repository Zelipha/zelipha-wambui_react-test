import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { Query } from "@apollo/client/react/components";
import DESCRIPTION from "../../Queries/DescriptionPageQuery";
import Images from "./DescriptionImages";
import Details from "./DescriptionDetails";
import "./DescriptionPage.css";

export class DescriptionPage extends Component {
  constructor(props) {
    super(props);

    this.displayProduct = this.displayProduct.bind(this);
  }

  displayProduct = (loading, error, data) => {
    const { id } = this.props;
    if (loading) return "loading...";
    if (error) return "error...";
    if (data) {
      if (!data.product) {
        return <Navigate to="/404" />;
      }
      const { name, prices, gallery, description, attributes, brand, inStock } = data.product;

      return (
        <div className="description-page">
          <Images name={name} gallery={gallery} inStock={inStock} />
          <Details name={name} brand={brand} prices={prices} attributes={attributes} inStock={inStock} description={description} id={id} />
        </div>
      );
    }
  };

  render() {
    const { id } = this.props;
    return (
      <Query query={DESCRIPTION} variables={{ productID: id }}>
        {({ loading, data, error }) => this.displayProduct(loading, error, data)}
      </Query>
    );
  }
}

export default DescriptionPage;
