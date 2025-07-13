const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');


//we will use omdb Api to fetch movie details
const getMovieInfo = async(movie) =>{
    const myApiKey = "4bc8155c";
    const url = `http://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;
    const response = await fetch(url);
    const data = await response.json();

    showMovieData(data);
};

const showMovieData = (data)=>{
    movieContainer.innerHTML = "";
    //use array destructuring
    const {Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster} = data;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML = `<h2>${Title}</h2>
                            <p><strong>Rating: &#11088</strong>${imdbRating}</p>`;

    const movieGenereElement = document.createElement('div');
    movieGenereElement.classList.add('movie-genre');
    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerText = element;
        movieGenereElement.appendChild(p);
    });
    movieElement.appendChild(movieGenereElement);
    movieElement.innerHTML += `<p><strong>Released Date: </strong>${Released}</p>
    <p><strong>Duration: </strong>${Runtime}</p>
    <p><strong>Cast: </strong>${Actors}</p>
    <p><strong>Plot: </strong>${Plot}</p>
    `;
    //creating div for movie poster
    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src="${Poster}"/>`;

    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);

}

searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const movieName=inputBox.value.trim();
    if(movieName !== ''){
        getMovieInfo(movieName);
    }
});


