import Player from '@vimeo/player';
const throttle = require('lodash.throttle');
const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on(
  'timeupdate',
  throttle(ev => {
    localStorage.setItem(STORAGE_KEY, ev.seconds);
  }, 1000)
);

const playerCurrentTime = localStorage.getItem(STORAGE_KEY) || 0;

player
  .setCurrentTime(playerCurrentTime)
  .then(function (seconds) {
    console.log(seconds);
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
