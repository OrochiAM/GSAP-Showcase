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

const loadTimeline = gsap.timeline();

loadTimeline
  .from('.logo, .sun, ul', {
    y: -200,
    opacity: 0,
    duration: 1,
    stagger: 0,
  })
  .from(mainHeaderSplit.lines, {
    y: 30,
    opacity: 0,
    stagger: 0.7,
    ease: 'back',
    scale: 0.8,
  });
