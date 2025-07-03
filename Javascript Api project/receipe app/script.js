const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');// it is global variable. so eventlistner method is made outside
const receipeContainer = document.querySelector('.receipe-container');//recipe-details-content
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

const fetchRecipes = async (query)=>{

    receipeContainer.innerHTML = "<h2>Fetching recipe ...</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    
    receipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        //console.log(meal);
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');

        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish<p/>
        <p>Belongs to <span>${meal.strCategory}</span> Category<p/>`;

        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);

        //adding eventListner to recipe button
        button.addEventListener('click',()=>{
            //open recipe popup
            openRecipePopup(meal);
        });

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

const openRecipePopup = (meal)=>{
recipeDetailsContent.innerHTML =`
<h2>${meal.strMeal}</h2>
`
recipeDetailsContent.parentElement.style.display = "block";
}


// the meal Db Api is used here. -- free api, no need to signup