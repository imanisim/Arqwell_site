/* Set each page to type: 'image' or 'video'. Paths are relative to the website root.
   Choose your own media by uploading the file to assets/media, then editing src/poster.
   Background videos must be muted, looped, and have a visible still poster. */
window.ARQWELL_HERO_MEDIA = {
  home: {
    type: 'image',
    image: 'assets/hero-architecture.svg',
    video: 'assets/media/arqwell-motion.mp4',
    poster: 'assets/hero-architecture.svg',
    alt: 'An original architectural drawing of layered built structures'
  },
  funding: {
    type: 'image',
    image: 'assets/media/funding-resilience.svg',
    video: 'assets/media/arqwell-motion.mp4',
    poster: 'assets/media/funding-resilience.svg',
    alt: 'Architectural linework illustrating resilient building systems'
  }
};
