const title = document.querySelector(".title");
const prevBtn = document.querySelector("#prev");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");
const musicContainer = document.querySelector(".music-container");
const progressContainer = document.querySelector(".progress-container");
const progressBar = document.querySelector(".progress-bar");
const audio = document.querySelector("audio");
const imageCover = document.querySelector(".image-cover");

// Song titles
const songs = ["hey", "summer", "ukulele"]

// Keep track of song
let songIndex = 1;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {

    title.innerText = song;
    imageCover.src = `images/${song}.jpg`;
    audio.src = `music/${song}.mp3`;

}

// Play song
function playSong() {

    musicContainer.classList.add("play");
    playBtn.querySelector("i.fas").classList.remove("fa-play");
    playBtn.querySelector("i.fas").classList.add("fa-pause");

    audio.play();

}

// Pause song
function pauseSong() {

    musicContainer.classList.remove("play");
    playBtn.querySelector("i.fas").classList.add("fa-play");
    playBtn.querySelector("i.fas").classList.remove("fa-pause");

    audio.pause();

}

// Next song
function nextSong(){

    songIndex++;

    if(songIndex > songs.length - 1){
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();

}

// Previous song
function prevSong(){

    songIndex--;

    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    
    loadSong(songs[songIndex]);

    playSong();

}

// Update progress bar
function updateProgress(e) {

    // const duration = e.srcElement.duration;
    // const currentTime = e.srcElement.currentTime;
    const {duration, currentTime} = e.srcElement;
    
    const progressPercent = (currentTime / duration) * 100;
    // console.log(progressPercent)
    progressBar.style.width = `${progressPercent}%`;

}

// Set progress bar
function setProgress(e){

    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    
    audio.currentTime = (clickX / width) * duration;

}

// Event listeners
playBtn.addEventListener("click", () => {

    const isPlaying = musicContainer.classList.contains("play");

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
    
});

// Change song
nextBtn.addEventListener("click", nextSong);

prevBtn.addEventListener("click", prevSong);

// Time/song update
audio.addEventListener("timeupdate", updateProgress);

// Click on progress bar
progressContainer.addEventListener("click", setProgress);

// Song ends
audio.addEventListener("ended", nextSong);