import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { Query } from "@apollo/client/react/components";
import LIST from "../../Queries/ListingPageQuery";
import "./ListingPage.css";
import ListingPageProduct from "./ListingPageProduct";

export class ListingPage extends Component {
  constructor(props) {
    super(props);

    this.displayListingPage = this.displayListingPage.bind(this);
  }

  displayListingPage = (loading, error, data) => {
    const { category } = this.props;

    if (loading) return "loading...";
    if (error) return "error...";
    if (data) {
      if (!data.category) {
        return <Navigate to="/404" />;
      }
      const { products } = data.category;
      return (
        <>
          {products.map((product) => (
            <ListingPageProduct key={product.name} product={product} category={category} />
          ))}
        </>
      );
    }
  };

  render() {
    const { category } = this.props;

    return (
      <div className="listing-page">
        <h1 className="listing-page-title">{category}</h1>
        <div className="listing-page-product-container">
          <Query query={LIST} variables={{ category: category }}>
            {({ loading, data, error }) => this.displayListingPage(loading, error, data)}
          </Query>
        </div>
      </div>
    );
  }
}

export default ListingPage;
