import React, { Component } from "react";
import update from "react-addons-update";

const Context = React.createContext();

export class ContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addedItems: [],
      currency: ["USD", 0],
    };
  }

  setCurrency = (currency, index) => {
    this.setState({
      currency: [currency, index],
    });
  };

  addItem = (item) => {
    this.setState((prevState) => {
      return {
        addedItems: [...prevState.addedItems, item],
      };
    });
  };

  setCounter = (counter, index) => {
    this.setState(
      update(this.state, {
        addedItems: {
          [index]: {
            [this.state.addedItems[index].length - 2]: {
              $set: counter,
            },
          },
        },
      })
    );
  };

  switchAttributes = (index, attributeIndex, attributeItem) => {
    attributeIndex++;
    this.setState(
      update(this.state, {
        addedItems: {
          [index]: {
            [attributeIndex]: {
              1: {
                $set: attributeItem.value,
              },
            },
          },
        },
      })
    );
  };

  removeItem = (itemIndex) => {
    let addedItemArray = [...this.state.addedItems];
    addedItemArray.splice(itemIndex, 1);
    this.setState({
      addedItems: addedItemArray,
    });
  };

  render() {
    return (
      <Context.Provider
        value={{
          addedItems: this.state.addedItems,
          currency: this.state.currency,
          setCurrency: this.setCurrency,
          addItem: this.addItem,
          setCounter: this.setCounter,
          switchAttributes: this.switchAttributes,
          removeItem: this.removeItem,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
