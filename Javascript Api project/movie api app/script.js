const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');


//we will use omdb Api to fetch movie details
const getMovieInfo = async(movie) =>{
    try {
    const myApiKey = "4bc8155c";
    const url = `http://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;
    const response = await fetch(url);
    if(!response.ok){
        throw new Error("Unable to fetch movie detail");
    }
    const data = await response.json();

    showMovieData(data);
      } catch (error) {
        showErrorMessage("No Movie Found");
    }
};

const showMovieData = (data)=>{
    movieContainer.innerHTML = "";
    movieContainer.classList.remove('noBackground');
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

};

//function to display error message
const showErrorMessage = (message) =>{
    movieContainer.innerHTML = `<h2>${message}</h2>`;
    movieContainer.classList.add('noBackground');
}

searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const movieName=inputBox.value.trim();
    if(movieName !== ''){
        showErrorMessage("Fetching Movie Information ....")
        getMovieInfo(movieName);
    }else{
       showErrorMessage("Please Enter Movie Name To Search");
    }
});


