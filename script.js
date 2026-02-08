const API_KEY = "101e53dbfa295ffff266abfde8e5eb1d";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const movieContainer = document.getElementById("movieContainer");
const searchInput = document.getElementById("searchInput");

const modal = document.getElementById("movieModal");
const modalPoster = document.getElementById("modalPoster");
const modalTitle = document.getElementById("modalTitle");
const modalRating = document.getElementById("modalRating");
const modalRelease = document.getElementById("modalRelease");
const modalOverview = document.getElementById("modalOverview");

const closeModal = document.getElementById("closeModal");


/* Load popular movies initially */
fetchMovies(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);

async function fetchMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  displayMovies(data.results);
}

function displayMovies(movies) {
  movieContainer.innerHTML = "";

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    card.innerHTML = `
      <img src="${movie.poster_path ? IMG_URL + movie.poster_path : ""}">
      <h3>${movie.title}</h3>
      <span>⭐ ${movie.vote_average}</span>
    `;

    card.addEventListener("click", () => openModal(movie.id));
    movieContainer.appendChild(card);
  });
}

/* Search functionality */
searchInput.addEventListener("keyup", () => {
  const query = searchInput.value;
  if (query) {
    fetchMovies(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  } else {
    fetchMovies(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  }
});

/* Open movie details modal */
async function openModal(movieId) {
  const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  const movie = await res.json();

  modalPoster.src = movie.poster_path ? IMG_URL + movie.poster_path : "";
  modalTitle.textContent = movie.title;
  modalRating.textContent = `⭐ Rating: ${movie.vote_average}`;
  modalRelease.textContent = `Release Date: ${movie.release_date}`;
  modalOverview.textContent = movie.overview;

  modal.classList.remove("hidden");
}

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

modal.addEventListener("click", e => {
  if (e.target === modal) modal.classList.add("hidden");
});
