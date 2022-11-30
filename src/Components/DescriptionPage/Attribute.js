import React, { Component } from "react";
import { ternaryCheck } from "../../Helpers";
import "./Attribute.css";

export class Attribute extends Component {
  constructor(props) {
    super(props);

    this.isChecked = this.isChecked.bind(this);
  }

  isChecked = (selected, item, attributeIndex) => {
    if (selected.length === 0) {
      return "loading...";
    } else {
      return item.value === selected[attributeIndex + 1][1];
    }
  };

  render() {
    const { attributeKind, attributeIndex, selected, setSelected, attribute, item } = this.props;

    return (
      <div className="attribute-item-container">
        <input
          checked={this.isChecked(selected, item, attributeIndex)}
          type="radio"
          name={attribute.name}
          value={item.value}
          id={`${attribute.name}:${item.value}`}
          onChange={() => setSelected(attribute, attributeIndex, item)}
        />
        <label
          htmlFor={`${attribute.name}:${item.value}`}
          className={ternaryCheck(attributeKind, "color-label", "normal-label")}
          style={{
            backgroundColor: `${ternaryCheck(attributeKind, item.value, "none")}`,
          }}
        >
          {ternaryCheck(attributeKind, "", item.value)}
        </label>
      </div>
    );
  }
}

export default Attribute;
