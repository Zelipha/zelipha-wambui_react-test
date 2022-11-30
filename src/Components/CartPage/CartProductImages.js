import React, { Component } from "react";
import arrowLeft from "../../Assets/arrowLeft.svg";
import arrowRight from "../../Assets/arrowRight.svg";
import Context from "../../Context";
import "./CartProductImages.css";

export class CartProductImages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageIndex: 0,
    };

    this.previousImage = this.previousImage.bind(this);
    this.nextImage = this.nextImage.bind(this);
  }

  previousImage = () => {
    return this.state.imageIndex > 0
      ? this.setState((prevState) => {
          return {
            imageIndex: prevState.imageIndex - 1,
          };
        })
      : false;
  };

  nextImage = (gallery) => {
    return this.state.imageIndex < gallery.length - 1
      ? this.setState((prevState) => {
          return {
            imageIndex: prevState.imageIndex + 1,
          };
        })
      : false;
  };

  countImages = (gallery, ifMany) => {
    return gallery.length > 2 ? ifMany : "none";
  };

  static contextType = Context;

  render() {
    const { gallery, name } = this.props;
    const displayedImage = gallery[this.state.imageIndex];

    return (
      <div className="cart-images-container">
        <img src={arrowLeft} alt="arrow-left" className={this.countImages(gallery, "left-button")} onClick={this.previousImage} />
        <img className="cart-product-image" src={displayedImage} alt={name} />
        <img src={arrowRight} alt="arrow-right" className={this.countImages(gallery, "right-button")} onClick={() => this.nextImage(gallery)} />
      </div>
    );
  }
}

export default CartProductImages;
