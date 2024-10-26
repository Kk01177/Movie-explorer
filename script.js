const movieInput = document.getElementById("movie-input");
const searchMovieButton = document.getElementById("search-movie");
const movieDetails = document.getElementById("movie-details");
const movieTitle = document.getElementById("movie-title");
const moviePoster = document.getElementById("movie-poster");
const moviePlot = document.getElementById("movie-plot");
const addToListButton = document.getElementById("add-to-list");
const movieList = document.getElementById("movie-list");

let selectedMovie = null; // To hold movie details

searchMovieButton.addEventListener("click", async function() {
    const movieName = movieInput.value.trim();
    if (movieName) {
        const apiKey = "479b772f"; // Your API key

        const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${apiKey}`);
        const data = await response.json();

        if (data.Response === "True") {
            selectedMovie = data;
            movieTitle.textContent = data.Title; // Display movie title
            moviePoster.src = data.Poster; // Display movie poster
            moviePlot.textContent = data.Plot; // Display movie plot
            movieDetails.style.display = "block"; // Show movie details
        } else {
            alert("Movie not found! Please try another title.");
        }
    } else {
        alert("Please enter a movie name!");
    }
});

addToListButton.addEventListener("click", function() {
    if (selectedMovie) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>${selectedMovie.Title}</strong> (${selectedMovie.Year})
            <button class="remove-button">Remove</button>
        `;

        // Remove button functionality
        listItem.querySelector(".remove-button").addEventListener("click", function() {
            movieList.removeChild(listItem);
        });

        movieList.appendChild(listItem);

        // Clear input and hide details after adding
        movieInput.value = "";
        selectedMovie = null;
        movieDetails.style.display = "none";
    }
});
