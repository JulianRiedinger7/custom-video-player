const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const screen = document.querySelector('.screen');
const skipButtons = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider');

console.dir(video);

const togglePlay = () => {
	video.paused ? video.play() : video.pause();
};

const updateButton = (e) => {
	const icon = e.target.paused ? '►' : '❚ ❚';
	toggle.textContent = icon;
};

const skip = (e) => {
	video.currentTime += parseFloat(e.target.dataset.skip);
};

const handleRangeUpdate = (e) => {
	e.target.name === 'volume'
		? (video.volume = e.target.value)
		: (video.playbackRate = e.target.value);
};

const handleProgress = () => {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
};

const scrub = (e) => {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
};

const toggleFullScreen = () => {
	if (player.requestFullscreen) {
		player.requestFullscreen();
		video.style.height = '100%';
	}
};

video.addEventListener('click', togglePlay);
window.addEventListener('keydown', (e) => {
	if (e.key === ' ') {
		togglePlay();
	}
});

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
screen.addEventListener('click', toggleFullScreen);

skipButtons.forEach((button) => button.addEventListener('click', skip));

ranges.forEach((range) => range.addEventListener('change', handleRangeUpdate));
ranges.forEach((range) =>
	range.addEventListener('mousemove', handleRangeUpdate)
);

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => (mouseDown = true));
progress.addEventListener('mouseup', () => (mouseDown = false));
progress.addEventListener('mouseout', () => (mouseDown = false));
