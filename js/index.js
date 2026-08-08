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

gsap.set('.ball', { x: 500, y: 250 });

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
