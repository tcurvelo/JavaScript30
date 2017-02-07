const player = document.querySelector('.player');
const toggle = document.querySelector('.toggle');
const video = player.querySelector('.viewer');
const progressBar = player.querySelector('.progress__filled')
const progress = player.querySelector('.progress');
const skipButtons = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider');

function togglePlay() {
  video.paused ? video.play(): video.pause()
}

function updateToggleButton() {
  toggle.textContent = this.paused ? '►' : '⏸' ;
}

function skip(){
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  video.currentTime = e.offsetX / progress.offsetWidth * video.duration;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateToggleButton);
video.addEventListener('pause', updateToggleButton);
video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);


toggle.addEventListener('click', togglePlay);


ranges.forEach(
  item => item.addEventListener('change', handleRangeUpdate)
);

skipButtons.forEach(
  button => button.addEventListener('click', skip)
);
