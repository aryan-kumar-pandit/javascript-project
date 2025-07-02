const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const receipeContainer = document.querySelector('.receipe-container');

const fetchRecipes = async (query)=>{

    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    response.meals.forEach(meal => {
        //console.log(meal);
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea}<p/>
        <p>${meal.strCategory}<p/>
        `
        receipeContainer.appendChild(recipeDiv);
        
    });
    //console.log(response);
}

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
    //console.log("button clicked");
});

// the meal Db Api is used here. -- free api, no need to signup