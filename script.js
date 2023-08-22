'use strict';

const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.querySelector('.progress-container');
const progressEl = document.querySelector('.progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const songs = [
  {
    name: 'emre-1',
    displayName: 'The Man Who Sold The World 8D',
    artist: 'Emre Durak',
  },
  {
    name: 'emre-2',
    displayName: 'Memory Reboot 8D',
    artist: 'Emre Durak',
  },
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-3',
    displayName: 'Goodinght, Disco Queen',
    artist: 'Jacinto Design',
  },
  {
    name: 'metric-1',
    displayName: 'Front Row (Remix)',
    artist: 'Metric/Jacinto Design',
  },
];

let isPlaying = false;

const playSong = function () {
  isPlaying = true;
  play.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
};

const pauseSong = function () {
  isPlaying = false;
  play.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
};

const toggleSong = function () {
  if (!isPlaying) playSong();
  else pauseSong();
};

playBtn.addEventListener('click', toggleSong);

const loadSong = function (song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
};

let currentIndex = 0;

const prevSong = function () {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = songs.length - 1;
  }
  loadSong(songs[currentIndex]);
  playSong();
};

const nextSong = function () {
  currentIndex++;
  if (currentIndex > songs.length - 1) {
    currentIndex = 0;
  }
  loadSong(songs[currentIndex]);
  playSong();
};

const updateProgressBar = function (e) {
  if (!isPlaying) return;
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
  let durationMinutes = Math.floor(duration / 60);
  let durationSeconds = Math.floor(duration % 60);
  if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
  if (durationSeconds) {
    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
  }
  let currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);
  if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
  if (currentSeconds) {
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
};

const setProgressBar = function (e) {
  const width = this.clientWidth;
  const target = e.offsetX;
  const { duration } = music;
  const currentSec = (target / width) * duration;
  music.currentTime = currentSec;
  playSong();
};

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong)
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
