//http://www.omdbapi.com/?s=star&apikey=3701ec00
let form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let movieName = event.target.elements.name.value;
  let movieYear = event.target.elements.year.value;

  let url = `http://www.omdbapi.com/?s=${encodeURI(movieName)}&y=${encodeURI(
    movieYear
  )}&apikey=3701ec00`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject("Error");
      }
      return response.json();
    })
    .then((data) => {
      //Because of iterable problem
      if (!data.Search) {
        alert("The movie is not found");
        return;
      }
      renderMovies(data.Search);
    });
});

function renderMovies(search) {
  let content = "";

  content = "";

  for (movie of search) {
    content += `<div class="movies" data-imdbid=${movie.imdbID}>
      <img src="${movie.Poster}">
      <h5>${movie.Title}</h5>
      <span>${movie.Year}</span>
      </div>`;
  }

  document.querySelector("main").innerHTML = content;

  movieDetails();
}

function movieDetails() {
  let movies = document.querySelectorAll(".movies");
  for (movie of movies) {
    movie.onclick = (event) => {
      let id = event.target.parentElement.dataset.imdbid;

      let url = `http://www.omdbapi.com/?i=${id}&apikey=3701ec00`;
      getDetails(url);
    };
  }
}

async function getDetails(path) {
  let response = await fetch(path);
  if (!response.ok) {
    alert("Error");
    return;
  }

  let data = await response.json();
  renderDetails(data);
}

function renderDetails(data) {
  document.querySelector(".description").innerHTML = `
     <h3 class="margin">${data.Director}</h3>
     <p class="margin">${data.Genre}</p>
     <p class="margin">${data.Language}</p>
     <p class="margin">${data.Title}</p>
     <p class="margin">${data.Year}</p>
     <p>${data.Plot}</p>`;
}
