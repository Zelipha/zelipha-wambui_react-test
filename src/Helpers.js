export function ternaryCheck(condition, ifTrue, ifFalse) {
  return condition ? ifTrue : ifFalse;
}

export function setCurrencySign(currency) {
  switch (currency[0]) {
    case "USD":
      return "$";
    case "GBP":
      return "£";
    case "AUD":
      return "$";
    case "JPY":
      return "¥";
    case "RUB":
      return "₽";
    default:
      return "$";
  }
}

export function isChecked(attributeIndex, attributeItem, addedItems, itemIndex) {
  return attributeItem.value === addedItems[itemIndex][attributeIndex + 1][1] ? true : false;
}

export function isAttributeColor(attributeKind, attributeItem) {
  return attributeKind && attributeItem.value;
}

export function itemCounter(addedItems) {
  let itemCounter = 0;
  addedItems.forEach((item) => (itemCounter = itemCounter + item[item.length - 2]));

  return itemCounter;
}

export function decreaseCounter(counter, itemIndex, setCounter, removeItem) {
  counter > 1 ? setCounter(counter - 1, itemIndex) : removeItem(itemIndex);
}

export function increaseCounter(counter, itemIndex, setCounter) {
  setCounter(counter + 1, itemIndex);
}
