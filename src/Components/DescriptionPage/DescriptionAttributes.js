import React, { Component } from "react";
import Attribute from "./Attribute";
import "./DescriptionAttributes.css";

export class DescriptionAttributes extends Component {
  render() {
    const { selected, setSelected, attributes, name } = this.props;

    return (
      <>
        {attributes.map((attribute, attributeIndex) => {
          const attributeKind = attribute.name === "Color";
          return (
            <React.Fragment key={`${name}:${attribute.name}`}>
              <p className="attribute-name">{attribute.name}:</p>
              <div className="product-attributes">
                {attribute.items.map((item) => {
                  return (
                    <Attribute
                      key={`${name}:${item.value}`}
                      attributeKind={attributeKind}
                      attributeIndex={attributeIndex}
                      selected={selected}
                      setSelected={setSelected}
                      attribute={attribute}
                      name={name}
                      item={item}
                    />
                  );
                })}
              </div>
            </React.Fragment>
          );
        })}
      </>
    );
  }
}

export default DescriptionAttributes;
