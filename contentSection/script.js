const video = document.getElementById("myVideo");

function togglePlayPause() {
    if (video.paused || video.ended) {
        video.play();
    } else {
        video.pause();
    }
}

function skipForward(seconds) {
    video.currentTime += seconds;
}

document.getElementById("myVideo").addEventListener("play", function () {
    // Code to handle play button functionality
});

document.getElementById("myVideo").addEventListener("pause", function () {
    // Code to handle pause button functionality
});

document.getElementById("myVideo").addEventListener("timeupdate", function () {
    // Code to handle video time update (e.g., progress bar)
});
