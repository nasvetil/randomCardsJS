import { CardType } from './card_type.js';
import { validInputNumber } from './valid_input.js';

const formValue = {
  cardCount: 10,
  cardTypeList: [],
  getRandomHexColor: function () {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  },
  addCardType: function (name, count = 1, backgroundColor = this.getRandomHexColor()) {
    const cardType = new CardType(name, count, backgroundColor);
    this.cardTypeList.push(cardType);
  },
  removeCardType: function (name) {
    if (typeof name !== 'undefined') {
      this.cardTypeList.forEach((cardType, i) => {
        if (cardType.name === name) {
          delete this.cardTypeList[i];
        }
      });
    } else {
      this.cardTypeList.pop();
    }
  },
  setCardTypeName: function (id, name) {
    this.cardTypeList[id].name = name;
  },
  setCardTypeCount: function (id, count) {
    this.cardTypeList[id].count = count;
  }
};

const cardCountElem = document.getElementById('cards-count');
const cardTypeListElem = document.getElementById('cards_type_list');
const addCardTypeElem = document.getElementById('add_card_type');
const removeCardTypeElem = document.getElementById('remove_card_type');
const generateButtonElem = document.getElementById('generate-button');
const cardsBlockElem = document.getElementById('card-block');

let cardList = [];

const update = () => {
  cardTypeListElem.innerHTML = '';
  const elemList = [];
  formValue.cardTypeList.forEach((cardType, i) => {
    elemList.push(cardType.createCardTypeBlock(i));
  });
  elemList.forEach((elem) => {
    cardTypeListElem.append(elem);
  });
};

formValue.addCardType('special', 1);
update();

addCardTypeElem.addEventListener('click', () => {
  formValue.addCardType('', 1);
  update();
});

removeCardTypeElem.addEventListener('click', () => {
  formValue.removeCardType();
  update();
});

cardCountElem.value = formValue.cardCount;

cardCountElem.addEventListener('change' || 'keydown', (event) => {
  validInputNumber(event.target);
});

cardTypeListElem.addEventListener('change' || 'keydown', (event) => {
  if (event === undefined) {
    return;
  }
  const elem = event.target;
  const id = elem.getAttribute('data-card-type-id');
  if (elem.classList.contains('input--name')) {
    formValue.setCardTypeName(id, elem.value);
  }
  if (elem.classList.contains('input--number')) {
    validInputNumber(event.target);
    formValue.setCardTypeCount(id, elem.value);
    const specialCardTypeCount = formValue.cardTypeList.reduce((result, cardType) => {
      return result + Number(cardType.count);
    }, 0);
    console.log(specialCardTypeCount);
    if (cardCountElem.value < specialCardTypeCount) {
      formValue.cardCount = specialCardTypeCount;
      cardCountElem.value = specialCardTypeCount;
    }
  }
});

const getNewCard = (cardType) => {
  if (cardType === 'empty') {
    return {
      name: cardType,
      backgroundColor: '#ffffff',
      textColor: '#000000',
      isHidden: true
    };
  }
  return {
    name: cardType.name,
    backgroundColor: cardType.backgroundColor,
    textColor: cardType.textColor,
    isHidden: true
  };
};

const generateCards = () => {
  let specialCardTypeCount = 0;
  cardList = [];
  formValue.cardTypeList.forEach((cardType) => {
    for (let i = 0; i < cardType.count; i++) {
      cardList.push(getNewCard(cardType));
      specialCardTypeCount++;
    }
  });
  for (let i = specialCardTypeCount; i < formValue.cardCount; i++) {
    cardList.push(getNewCard('empty'));
  }
  cardList.sort(() => Math.random() - 0.5);
};

const getCardBlock = (numb) => {
  return `
      <div class="cards__item cards__item--hidden" data-numb="${numb + 1}">
        <p class="cards__number">${numb + 1}</p>
        <p class="cards__status"></p>
      </div>
    `;
};

const drawCards = () => {
  let code = '';
  cardList.forEach((card, i) => {
    code += getCardBlock(i);
  });

  cardsBlockElem.innerHTML = code;
};

const openCard = (elem) => {
  const id = elem.getAttribute('data-numb') - 1;
  const card = cardList[id];
  elem.classList.remove('cards__item--hidden');
  if (card.name === 'empty') {
    elem.classList.add('cards__item--empty');
  } else {
    elem.style.backgroundColor = card.backgroundColor;
    elem.style.color = card.textColor;
    elem.querySelector('.cards__status').innerHTML = card.name;
  }
};

generateButtonElem.addEventListener('click', () => {
  generateCards();
  drawCards();
});

cardsBlockElem.addEventListener('click', (event) => {
  const elem = event.target;
  if (elem.classList.contains('cards__item--hidden')) {
    openCard(elem);
  }
});
