document.addEventListener('DOMContentLoaded', () => {
  fetch("./vinyl.svg")
    .then((response) => response.text())
    .then((svg) => {
      const playerContainer = document.getElementById("player-container");
      playerContainer.innerHTML = svg;

      const vinyl = document.querySelector("svg");  // Get the vinyl SVG
      const playButton = document.getElementById("play-button");
      const secondButton = document.getElementById("second-button");
      const audio = document.getElementById("love-song");
      let isPlaying = false;

      // Play/Pause functionality
      playButton.addEventListener("click", () => {
        if (!isPlaying) {
          // Start spinning with a slower speed (12 seconds per rotation)
          vinyl.style.animation = "spin 10s linear infinite";  // Slow down the spin speed to 12 seconds
          vinyl.style.animationPlayState = "running";  // Ensure the animation is running
          //audio.playbackRate = 10; // Makes the song 10x faster
          audio.play();
          playButton.textContent = "Pause";  // Change button text to "Pause"
          isPlaying = true;
        } else {
          vinyl.style.animationPlayState = "paused";  // Pause the animation without resetting it
          audio.pause();
          playButton.textContent = "Play";  // Change button text to "Play"
          isPlaying = false;
        }
      });

      // Reset the audio and animation when the song ends
      audio.addEventListener("ended", () => {
        audio.currentTime = 0;  // Reset audio to the beginning
        vinyl.style.animationPlayState = "paused";  // Pause the animation at the last position
        playButton.textContent = "Play";  // Reset the button text to "Play"
        console.log("Song has ended"); // Debugging step
        secondButton.style.display = "block"; // Show the second button
        isPlaying = false;  // Reset play state
      });

      // Redirect when the second button is clicked
      secondButton.addEventListener("click", function() {
        window.location.href = "../roro/letter.html";  // Replace with your actual target URL
      });
    })
    .catch((err) => console.error("Error loading SVG:", err));

  // Fetch and load the side player SVG
  fetch("./Player.svg")
    .then((response) => response.text())
    .then((svg) => {
      const sideSvgContainer = document.getElementById("side-svg-container");
      sideSvgContainer.innerHTML = svg;  // Insert the side SVG into the container
    })
    .catch((err) => console.error("Error loading second SVG:", err));
});
