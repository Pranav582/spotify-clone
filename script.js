


console.log("Welcome to Spotify");

let songs = [
    { name: "Cry For Me - The Weeknd", filePath: "songs/Cry For Me The Weeknd (pagalall.com).mp3", duration: "05:44" },
    { name: "After Hours", filePath: "songs/The Weeknd - After Hours (Audio).mp3", duration: "06:01" },
    { name: "Blinding Light", filePath: "songs/The Weeknd - Blinding Lights (Official Audio).mp3", duration: "03:23" }
];

let songIndex = 0;
let audio = new Audio(songs[songIndex].filePath);
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songInfo = document.querySelector('.songInfo');
let playButtons = document.querySelectorAll('.fa-circle-play');

// Function to play song
function playSong(index) {
    if (index < 0 || index >= songs.length) {
        console.error("Invalid song index: " + index);
        return;
    }

    songIndex = index;
    audio.src = songs[songIndex].filePath;
    audio.currentTime = 0;
    audio.play();
    updatePlayUI(true);
    updateSongInfo();
    updatePlayIcons();
}

// Function to update the song info
function updateSongInfo() {
    songInfo.innerHTML = `<img src="932fd00d9b43753061c47739f0cc777b.gif" width="45px" /> ${songs[songIndex].name}`;
    gif.style.opacity = 1;
}

// Update play button icons (for master and individual)
function updatePlayIcons() {
    playButtons.forEach((btn, i) => {
        btn.classList.remove('fa-circle-pause');
        btn.classList.add('fa-circle-play');
        if (i === songIndex && !audio.paused) {
            btn.classList.remove('fa-circle-play');
            btn.classList.add('fa-circle-pause');
        }
    });
}

// Update master play UI (play/pause icon)
function updatePlayUI(isPlaying) {
    if (isPlaying) {
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
}

// Master play/pause button functionality
masterPlay.addEventListener('click', () => {
    if (audio.paused || audio.currentTime <= 0) {
        audio.play();
        updatePlayUI(true);
        updatePlayIcons();
    } else {
        audio.pause();
        updatePlayUI(false);
        updatePlayIcons();
    }
});

// Per-song buttons (play/pause for each song)
playButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        if (songIndex === index && !audio.paused) {
            audio.pause();
            updatePlayUI(false);
        } else {
            playSong(index);
        }
        updatePlayIcons();
    });
});

// Progress bar updates
audio.addEventListener('timeupdate', () => {
    let progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
});

progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Next & Previous buttons
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length; // Ensures wrapping around
    playSong(songIndex);
});

document.getElementById('prev').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length; // Ensures wrapping around
    playSong(songIndex);
});

// Auto-play next when a song ends
audio.addEventListener('ended', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});
