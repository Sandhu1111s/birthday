// ---- Card messages for Kanchan ----
const messages = {
  1: {
    emoji: '💗',
    title: 'My Rasmalai',
    text: "You are the sweetest thing that has ever happened to me. Just like rasmalai — soft, sweet, and so incredibly special. Life is a thousand times better with you in it. 🍮💕"
  },
  2: {
    emoji: '🌸',
    title: 'My Baby Kannu',
    text: "Kannu… just hearing your name makes my heart smile. You are my favorite person, my calm in every storm, my reason to look forward to every single day. I love you more than words can ever say. 🌸"
  },
  3: {
    emoji: '💝',
    title: 'My Baby',
    text: "Baby, from the very first moment we met — on my birthday, 23rd September — I knew something magical was happening. You walked in and took my breath away, and you've had my heart ever since. 💝"
  },
  4: {
    emoji: '🌹',
    title: 'My Kanchan',
    text: "Kanchan, you are not just special to me — you are my world. My love for you is real, deep, and forever. I love you so so much. Always remember that. 🌹💖"
  }
};


// ---- Screen management ----
const screens = {
  landing: document.getElementById('screen-landing'),
  unwrap: document.getElementById('screen-unwrap'),
  cards: document.getElementById('screen-cards'),
  mahadev: document.getElementById('screen-mahadev'),
  food: document.getElementById('screen-food'),
  finale: document.getElementById('screen-finale')
};

const openBtn = document.getElementById('open-gift');
const modal = document.getElementById('card-modal');
const modalEmoji = document.getElementById('modal-emoji');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const cardsProgress = document.getElementById('cards-progress');
const replayBtn = document.getElementById('replay');

let openedCards = new Set();

// ---- Live together counter ----
const togetherStartDate = new Date(2026, 8, 23);
const togetherCounter = {
  days: document.getElementById('cnt-days'),
  hours: document.getElementById('cnt-hours'),
  minutes: document.getElementById('cnt-mins'),
  seconds: document.getElementById('cnt-secs')
};

function updateTogetherCounter() {
  const now = new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const startDay = Date.UTC(
    togetherStartDate.getFullYear(),
    togetherStartDate.getMonth(),
    togetherStartDate.getDate()
  );
  const days = Math.floor((today - startDay) / 86400000);

  if (days < 0) {
    togetherCounter.days.textContent = '0';
    togetherCounter.hours.textContent = '0';
    togetherCounter.minutes.textContent = '0';
    togetherCounter.seconds.textContent = '0';
    return;
  }

  togetherCounter.days.textContent = String(days);
  togetherCounter.hours.textContent = String(now.getHours());
  togetherCounter.minutes.textContent = String(now.getMinutes());
  togetherCounter.seconds.textContent = String(now.getSeconds());
}

updateTogetherCounter();
setInterval(updateTogetherCounter, 1000);

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ---- Open gift ----
openBtn.addEventListener('click', () => {
  openBtn.classList.add('opening');
  setTimeout(() => {
    showScreen('unwrap');
    setTimeout(() => showScreen('cards'), 2400);
  }, 700);
});

// ---- Wish cards ----
document.querySelectorAll('.wish-card').forEach(card => {
  card.addEventListener('click', () => {
    const id = card.dataset.card;
    if (openedCards.has(id)) return;

    const msg = messages[id];
    modalEmoji.textContent = msg.emoji;
    modalTitle.textContent = msg.title;
    modalMessage.textContent = msg.text;
    modal.showModal();

    openedCards.add(id);
    card.classList.add('opened');
    cardsProgress.textContent = `${openedCards.size} / 4 opened 💕`;

    if (openedCards.size === 4) {
      setTimeout(() => showScreen('mahadev'), 900);
    }
  });
});

// ---- Modal close ----
document.querySelector('.modal-close').addEventListener('click', () => modal.close());
document.querySelector('.modal-ok').addEventListener('click', () => modal.close());

// ---- Mahadev continue button ----
document.getElementById('mahadev-continue').addEventListener('click', () => showScreen('food'));

// ---- Food continue button ----
document.getElementById('food-continue').addEventListener('click', () => showScreen('finale'));

// ---- Replay ----
replayBtn.addEventListener('click', () => {
  openedCards.clear();
  document.querySelectorAll('.wish-card').forEach(c => c.classList.remove('opened'));
  cardsProgress.textContent = '0 / 4 opened';
  openBtn.classList.remove('opening');
  showScreen('landing');
});
