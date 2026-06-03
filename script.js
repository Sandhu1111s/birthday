const messages = {
  1: {
    label: '1',
    text: "You're the kind of friend who shows up with energy even on boring days. People notice — in a good way!"
  },
  2: {
    label: '2',
    text: "Your laugh should be copyrighted. Seriously, group chats are 10x funnier when you're in them."
  },
  3: {
    label: '3',
    text: "Random fact: the world needs more people who are kind AND funny. You check both boxes."
  },
  4: {
    label: '4',
    text: "Official friend rule: you owe nobody an explanation for being awesome. Keep doing your thing, Anchal!"
  }
};

const screens = {
  landing: document.getElementById('screen-landing'),
  unwrap: document.getElementById('screen-unwrap'),
  cards: document.getElementById('screen-cards'),
  finale: document.getElementById('screen-finale')
};

const openBtn = document.getElementById('open-gift');
const modal = document.getElementById('card-modal');
const modalEmoji = document.getElementById('modal-emoji');
const modalMessage = document.getElementById('modal-message');
const cardsProgress = document.getElementById('cards-progress');
const replayBtn = document.getElementById('replay');

let openedCards = new Set();

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

openBtn.addEventListener('click', () => {
  openBtn.classList.add('opening');
  setTimeout(() => {
    showScreen('unwrap');
    setTimeout(() => showScreen('cards'), 2200);
  }, 700);
});

document.querySelectorAll('.wish-card').forEach(card => {
  card.addEventListener('click', () => {
    const id = card.dataset.card;
    if (openedCards.has(id)) return;

    const msg = messages[id];
    modalEmoji.textContent = msg.label;
    modalMessage.textContent = msg.text;
    modal.showModal();

    openedCards.add(id);
    card.classList.add('opened');
    cardsProgress.textContent = `${openedCards.size} / 4 opened`;

    if (openedCards.size === 4) {
      setTimeout(() => showScreen('finale'), 800);
    }
  });
});

document.querySelector('.modal-close').addEventListener('click', () => modal.close());
document.querySelector('.modal-ok').addEventListener('click', () => modal.close());

replayBtn.addEventListener('click', () => {
  openedCards.clear();
  document.querySelectorAll('.wish-card').forEach(c => c.classList.remove('opened'));
  cardsProgress.textContent = '0 / 4 opened';
  openBtn.classList.remove('opening');
  showScreen('landing');
});
