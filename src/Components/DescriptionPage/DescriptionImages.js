import React, { Component } from "react";
import { ternaryCheck } from "../../Helpers";
import Context from "../../Context";
import "./DescriptionImages.css";

export class Images extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: true,
    };

    this.initialImage = this.initialImage.bind(this);
    this.changeImage = this.changeImage.bind(this);
  }

  initialImage = (image) => {
    this.setState({
      image: image,
    });
  };

  changeImage = (image, gallery) => {
    return image === true ? gallery[0] : image;
  };

  static contextType = Context;
  render() {
    const { name, gallery, inStock } = this.props;
    const { image } = this.state;
    return (
      <>
        <div className="small-image-container">
          {gallery.map((image, index) => (
            <img
              className={ternaryCheck(inStock, "small-image", "small-image-out")}
              src={image}
              alt={name}
              onClick={() => {
                this.initialImage(image);
              }}
              key={`${name}:${index}`}
            />
          ))}
        </div>
        <div className="big-image-container">
          <img className={ternaryCheck(inStock, "big-image", "big-image-out")} src={this.changeImage(image, gallery)} alt={name} />
          <div className={ternaryCheck(inStock, "none", "outofstock-sign")}>OUT OF STOCK</div>
        </div>
      </>
    );
  }
}

export default Images;
