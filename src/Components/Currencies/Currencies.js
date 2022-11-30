import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { Query } from "@apollo/client/react/components";
import { ternaryCheck, setCurrencySign } from "../../Helpers";
import CURRENCIES from "../../Queries/CurrenciesQuery";
import Context from "../../Context";
import "./Currencies.css";

export class Currency extends Component {
  constructor(props) {
    super(props);
    this.currency = React.createRef();
    this.displayCurrencies = this.displayCurrencies.bind(this);
    this.handleOutsideCurrenciesClick = this.handleOutsideCurrenciesClick.bind(this);
  }
  static contextType = Context;

  displayCurrencies = (loading, error, data) => {
    const { currenciesOpen, isCurrenciesOpen } = this.props;
    const { setCurrency, chosenCurrency } = this.context;

    if (loading) return "loading..";
    if (error) return "error...";
    if (data) {
      if (!data.currencies) {
        return <Navigate to="/404" />;
      }
      const { currencies } = data;
      return (
        <div className={ternaryCheck(currenciesOpen, "currency-list", "none")} ref={this.currency}>
          {currencies.map((currency, currencyIndex) => {
            const currencyCheck = currency === chosenCurrency;
            return (
              <div className="currency" key={currency}>
                <input
                  checked={ternaryCheck(currencyCheck, true, false)}
                  type="radio"
                  name="currency"
                  id={currency}
                  value={currency}
                  onChange={() => {
                    setCurrency(currency, currencyIndex);
                    isCurrenciesOpen(false);
                  }}
                />
                <label htmlFor={currency}>
                  {setCurrencySign([currency])} {currency}
                </label>
              </div>
            );
          })}
        </div>
      );
    }
  };

  handleOutsideCurrenciesClick = (event) => {
    if (this.currency.current && !this.currency.current.contains(event.target) && this.props.currenciesRef.current && !this.props.currenciesRef.current.contains(event.target)) {
      this.props.isCurrenciesOpen(false);
    }
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleOutsideCurrenciesClick);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleOutsideCurrenciesClick);
  }

  render() {
    return <Query query={CURRENCIES}>{({ loading, data, error }) => this.displayCurrencies(loading, error, data)}</Query>;
  }
}

export default Currency;
