const MAX_CARDS_COUNT = 50;

const formValue = {
  cardsCount: 10,
  specialCardsCount: 1,
  generateStatus: false
};

let cardsList = [];

const cardsCountElem = document.getElementById('cards-count');
const specialCardsCountElem = document.getElementById('special-cards-count');
const generateButtonElem = document.getElementById('generate-button');
const cardsBlockElem = document.getElementById('card-block');

const setStandartValue = () => {
  cardsCountElem.value = formValue.cardsCount;
  specialCardsCountElem.value = formValue.specialCardsCount;
};

const setCardsCountValue = (count) => {
  formValue.cardsCount = count;
  cardsCountElem.value = formValue.cardsCount;
};

const setSpecialCardsCountValue = (count) => {
  formValue.specialCardsCount = count;
  specialCardsCountElem.value = formValue.specialCardsCount;
};

const updateSpecialCardsCountElem = () => {
  const specialCardsCount = Number(specialCardsCountElem.value);
  if (specialCardsCount > formValue.cardsCount) {
    setSpecialCardsCountValue(formValue.cardsCount);
  } else if (specialCardsCount < 1) {
    setSpecialCardsCountValue(1);
  } else if (specialCardsCount > MAX_CARDS_COUNT) {
    setSpecialCardsCountValue(MAX_CARDS_COUNT);
  } else {
    setSpecialCardsCountValue(specialCardsCount);
  }
};

const updateCardsCountElem = () => {
  const cardsCount = Number(cardsCountElem.value);
  if (cardsCount < 1) {
    setCardsCountValue(1);
  } else if (cardsCount > MAX_CARDS_COUNT) {
    setCardsCountValue(MAX_CARDS_COUNT);
  } else {
    setCardsCountValue(cardsCount);
  }

  updateSpecialCardsCountElem();
};

const getCardBlock = (card, numb) => {
  return `<div class="cards__item cards__item--hidden" data-numb="${numb + 1}">
            <p class="cards__number">${numb + 1}</p>
            <p class="cards__status"></p>
          </div>`;
};

const getNewCard = (cardType) => {
  return {
    type: cardType,
    isHidden: true
  };
};

const generateCards = () => {
  cardsList = [];
  for (let i = 0; i < formValue.cardsCount - formValue.specialCardsCount; i++) {
    cardsList.push(getNewCard('empty'));
  }
  for (let i = 0; i < formValue.specialCardsCount; i++) {
    cardsList.push(getNewCard('special'));
  }
  cardsList.sort(() => Math.random() - 0.5);
};

const drawCards = () => {
  let code = '';
  cardsList.forEach((card, i) => {
    code += getCardBlock(card, i);
  });

  cardsBlockElem.innerHTML = code;
};

const openCard = (elem) => {
  const id = elem.getAttribute('data-numb') - 1;
  const card = cardsList[id];
  elem.classList.remove('cards__item--hidden');
  if (card.type === 'empty') {
    elem.classList.add('cards__item--empty');
  } else {
    elem.classList.add('cards__item--special');
    elem.querySelector('.cards__status').innerHTML = 'special';
  }
};

const checkGenerateParams = () => {
  if (
    formValue.specialCardsCount > formValue.cardsCount ||
    formValue.cardsCount > MAX_CARDS_COUNT) {
    return false;
  }
  return true;
};

// initialization
setStandartValue();

cardsCountElem.addEventListener('change' || 'keydown', () => {
  updateCardsCountElem();
});

specialCardsCountElem.addEventListener('change' || 'keydown', () => {
  updateSpecialCardsCountElem();
});

generateButtonElem.addEventListener('click', () => {
  if (!checkGenerateParams()) {
    return;
  }
  generateCards();
  drawCards();
});

cardsBlockElem.addEventListener('click', (event) => {
  const elem = event.target;
  if (elem.classList.contains('cards__item')) {
    if (elem.classList.contains('cards__item--hidden')) {
      openCard(elem);
    }
  }
});
