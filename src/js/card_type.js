import { hexToHSL } from './color.js';

class CardType {
  constructor (name, count, backgroundColor) {
    this._name = name;
    this._count = count;
    this._backgroundColor = backgroundColor;
    const backgroundColorHLS = hexToHSL(this._backgroundColor);
    if (backgroundColorHLS.l < 50) {
      this._textColor = '#ffffff';
    } else {
      this._textColor = '#000000';
    }
  }

  get name () {
    return this._name;
  }

  set name (name) {
    this._name = name;
  }

  get count () {
    return this._count;
  }

  set count (count) {
    this._count = count;
  }

  get backgroundColor () {
    return this._backgroundColor;
  }

  set backgroundColor (backgroundColor) {
    this._backgroundColor = backgroundColor;
  }

  get textColor () {
    return this._textColor;
  }

  set textColor (textColor) {
    this._textColor = textColor;
  }

  createLabelElem (numb, text, hidden = false) {
    const labelElem = document.createElement('label');
    labelElem.classList.add('form__label');
    if (hidden) {
      labelElem.classList.add('visually-hidden');
    }
    labelElem.innerHTML = text;
    return labelElem;
  }

  createInputElem (numb, className, type, value, placeholder) {
    const inputElem = document.createElement('input');
    inputElem.classList.add('form__input');
    inputElem.classList.add('input');
    inputElem.classList.add(className);
    inputElem.setAttribute('data-card-type-id', numb);
    inputElem.setAttribute('type', type);
    inputElem.setAttribute('value', value);
    if (placeholder) {
      inputElem.setAttribute('placeholder', placeholder);
    }
    return inputElem;
  }

  createBackgroundColorMardElem () {
    const backgroundColorMarkElem = document.createElement('div');
    backgroundColorMarkElem.classList.add('form__mark');
    backgroundColorMarkElem.style.backgroundColor = this.backgroundColor;
    return backgroundColorMarkElem;
  }

  createCardTypeBlock (numb) {
    if (typeof numb !== 'number') {
      Error('Create card type block error: incorrect card number');
      return null;
    }

    // Create DOM node
    const cardTypeBlock = document.createElement('section');
    cardTypeBlock.classList.add('form__item');
    cardTypeBlock.classList.add('form__item--card-type');
    cardTypeBlock.append(this.createBackgroundColorMardElem());
    cardTypeBlock.append(this.createLabelElem(numb, 'Card type name', true));
    cardTypeBlock.append(this.createInputElem(numb, 'input--name', 'text', this._name, 'card type name'));
    cardTypeBlock.append(this.createLabelElem(numb, 'Count'));
    cardTypeBlock.append(this.createInputElem(numb, 'input--number', 'number', this._count));
    return cardTypeBlock;
  }
}

export { CardType };
