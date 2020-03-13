const validInputNumber = (elem) => {
  let elemValue = Number(elem.value);
  if (elemValue < 0) {
    elem.value = 0;
  }
  if ((elemValue ^ 0) !== elemValue) {
    elemValue = Math.floor(elemValue);
    elem.value = elemValue;
  }
};

export { validInputNumber };
