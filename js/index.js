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
  .to('.sun', { height: 120 }, '<');

// SUNCE
const tlSun = gsap.timeline({
  scrollTrigger: {
    pin: true,
    scrub: 1,
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
  oblaci.forEach((o) => (o.style.bottom = `${getRandom(40, 200)}px`));

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
