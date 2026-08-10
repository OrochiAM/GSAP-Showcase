gsap.registerPlugin(
  ScrollTrigger,
  ScrollToPlugin,
  MotionPathPlugin,
  Draggable,
  InertiaPlugin,
  SplitText,
  TextPlugin,
);

// NAVBAR

const tlNavBar = gsap.timeline({
  scrollTrigger: {
    start: 'top+=50',
    end: '+=20',
    toggleActions: 'play none none reverse',
    scrub: 3,
  },
});

tlNavBar
  .to('nav', {
    height: 120,
  })
  .to('.sun', { scale: 0.6 }, '<');

// SUNCE
const tlSun = gsap.timeline({
  scrollTrigger: {
    pin: true,
    scrub: 0,
  },
});

tlSun.to('.sun', {
  rotation: 360,
});

// OBLACI
const getRandom = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const oblaci = document.querySelectorAll('.cloud');

const randomOblaciPosition = () =>
  oblaci.forEach((o) => (o.style.bottom = `${getRandom(70, 200)}px`));

let vw = window.innerWidth;
tl = gsap.timeline({ repeat: -1 });

tl.to('.cloud', {
  duration: 20,
  ease: 'none',
  stagger: 8,
  transformOrigin: 'center center',
  motionPath: {
    path: [
      { x: -vw * 0.1, y: 0 },
      { x: vw * 0.15, y: getRandom(-25, 25) },
      { x: vw * 0.4, y: getRandom(35, 60) },
      { x: vw * 0.65, y: getRandom(-45, -20) },
      { x: vw * 0.9, y: getRandom(20, 45) },
      { x: vw * 1.3, y: getRandom(-15, 15) },
    ],
    curviness: 1,
  },
  onStart: randomOblaciPosition,
});

// LOAD ANIMACIJA

const mainHeaderSplit = SplitText.create('.header', { type: 'lines' });

const loadTimeline = gsap.timeline({ ease: 'power4' });

loadTimeline
  .from('.sun', {
    y: -200,
    opacity: 0,
    duration: 1,
    stagger: 0,
  })
  .from('.logo', {
    y: -20,
    opacity: 0,
  })
  .from('nav > ul > li', {
    y: -20,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
  })
  .from(
    mainHeaderSplit.lines,
    {
      y: 30,
      opacity: 0,
      stagger: 0.7,
      ease: 'back',
      scale: 0.8,
    },
    '-=0.3',
  );

// DRAGGABLE

Draggable.create('.flower-top', {
  type: 'rotation',
  inertia: true,
});

Draggable.create('.car', {
  type: 'x',
  bounds: '.canvas',
});

gsap.set('.ball', { x: 500, y: 200 });

Draggable.create('.ball', {
  bounds: '.canvas',
  inertia: true,

  onThrowComplete: function () {
    const canvas = document.querySelector('.canvas');
    const ball = this.target;

    const canvasBottom = canvas.getBoundingClientRect().bottom - 50;
    const ballBottom = ball.getBoundingClientRect().bottom;

    const distanceToFloor = canvasBottom - ballBottom - 3;

    gsap.to(ball, {
      y: `+=${distanceToFloor}`,
      duration: 0.8,
      ease: 'bounce.out',
    });
  },
});

// CAROUSEL
let emojis = [
  '🌸',
  '🌻',
  '🌼',
  '🌷',
  '💐',
  '🦄',
  '♥️',
  '🌲',
  '🐍',
  '🐢',
  '🦚',
  '🍉',
  '🍓',
  '🍒',
  '🍄',
];

const carouselCards = document.querySelectorAll('.track .card');

carouselCards.forEach((c, i) => {
  c.children[0].innerHTML = `<p>${emojis[Math.floor(Math.random() * emojis.length)]}</p>`;
  c.children[1].innerHTML = `Kartica #${i} `;
});

let carousel_width = document.querySelector('.slider').offsetWidth;
let sections = gsap.utils.toArray('.track .card');
let track = document.querySelector('.track');
let track_width = sections[0].offsetWidth * sections.length;
let drag_width = track_width - carousel_width;
let slider = document.querySelector('.scroller');
let slider_width = slider.offsetWidth;
let thumb = slider.querySelector('.thumb');
let thumb_width = thumb.offsetWidth;
let ratio = drag_width / (slider_width - thumb_width);

addEventListener('resize', () => {
  carousel_width = document.querySelector('.slider').offsetWidth;
  sections = gsap.utils.toArray('.track .card');
  track = document.querySelector('.track');
  track_width = sections[0].offsetWidth * sections.length;
  drag_width = track_width - carousel_width;
  slider = document.querySelector('.scroller');
  slider_width = slider.offsetWidth;
  thumb = slider.querySelector('.thumb');
  thumb_width = thumb.offsetWidth;
  ratio = drag_width / (slider_width - thumb_width);
  gsap.set(thumb, { x: (-1 * this.x) / ratio });
  gsap.set(track, { x: -1 * this.x * ratio });

  Draggable.get(track).kill();

  drag_carousel = Draggable.create(track, {
    type: 'x',
    bounds: {
      minX: 0,
      maxX: -1 * drag_width,
    },
    onDrag: function () {
      gsap.set(thumb, { x: (-1 * this.x) / ratio });
    },
    onThrowUpdate() {
      gsap.set(thumb, { x: (-1 * this.x) / ratio });
    },
  });
});

let drag_carousel = Draggable.create(track, {
  type: 'x',
  bounds: {
    minX: 0,
    maxX: -1 * drag_width,
  },
  onDrag: function () {
    gsap.set(thumb, { x: (-1 * this.x) / ratio });
  },
  onThrowUpdate() {
    gsap.set(thumb, { x: (-1 * this.x) / ratio });
  },
});

let drag_thumb = Draggable.create(thumb, {
  type: 'x',
  bounds: slider,
  onDrag: function () {
    gsap.set(track, { x: -1 * this.x * ratio });
  },
  onThrowUpdate() {
    gsap.set(track, { x: -1 * this.x * ratio });
  },
});

// BARS
gsap.from('.fill', {
  width: 0,
  transformOrigin: 'left',
  duration: 1,
  stagger: 0.5,
  opacity: 0,
  scrollTrigger: {
    trigger: '.fill',
    toggleActions: 'play none none none',
  },
});

document.querySelectorAll('.number').forEach((n) => {
  const obj = { val: 0 };
  const target = parseFloat(n.dataset.target);

  gsap.to(obj, {
    val: target,
    duration: 2,
    ease: 'power1.out',
    scrollTrigger: {
      trigger: n,
      toggleActions: 'play none none none',
    },
    onUpdate() {
      n.textContent = Math.round(obj.val) + '%';
    },
  });
});

// FLOWERS

const flowersSplit = SplitText.create('.flowers', { type: 'chars' });
console.log(flowersSplit);

const flowerSectionWidth =
  document.querySelector('.flower-section').offsetWidth;

const tlButton = gsap.timeline({ paused: true });

tlButton
  .to(flowersSplit.chars, {
    yPercent: -115,
    stagger: {
      each: 0.1,
      from: 'end',
    },
  })
  .to('.bee', {
    motionPath: {
      path: [
        { x: 0, y: 0 },
        { x: -flowerSectionWidth * 0.25, y: -50 },
        { x: -flowerSectionWidth * 0.5, y: 35 },
        { x: -flowerSectionWidth * 0.75, y: -40 },
        { x: -flowerSectionWidth - 170, y: 40 },
      ],
      curviness: 1.5,
    },
    duration: 4,
    repeat: -1,
    ease: 'none',
  });

const flowerButton = document.querySelector('.flower-button');
const replayButton = document.querySelector('.replay-button');

let isPlaying = false;
let isFirst = false;

flowerButton.addEventListener('click', () => {
  if (!isFirst) {
    replayButton.disabled = false;
  }

  if (!isPlaying) {
    tlButton.play();
    flowerButton.children[0].src = 'images/pause.svg';
    flowerButton.children[1].innerHTML = 'PAUSE';
  } else {
    tlButton.pause();
    flowerButton.children[0].src = 'images/play.svg';
    flowerButton.children[1].innerHTML = 'PLAY';
  }

  isPlaying = !isPlaying;
});

replayButton.addEventListener('click', () => {
  tlButton.restart();
});
