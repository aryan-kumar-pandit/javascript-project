const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn"); // it is global variable. so eventlistner method is made outside
const receipeContainer = document.querySelector(".receipe-container"); //recipe-details-content
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");

const fetchRecipes = async (query) => {
  receipeContainer.innerHTML = "<h2>Fetching recipe ...</h2>";

  try {

  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const response = await data.json();

  receipeContainer.innerHTML = "";
  response.meals.forEach((meal) => {
    //console.log(meal);
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("recipe");

    recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish<p/>
        <p>Belongs to <span>${meal.strCategory}</span> Category<p/>`;

    const button = document.createElement("button");
    button.textContent = "View Recipe";
    recipeDiv.appendChild(button);

    //adding eventListner to recipe button
    button.addEventListener("click", () => {
      //open recipe popup
      openRecipePopup(meal);
    });

    receipeContainer.appendChild(recipeDiv);
  });    
  } catch (error) {
    receipeContainer.innerHTML = "<h2>Error in Fetching recipe ...</h2>";
  }
  //console.log(response);
};



//function to fetch ingredients and measurments
const fetchIngredients = (meal) => {
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredientsList += `<li>${measure}  ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
};

const openRecipePopup = (meal) => {
  recipeDetailsContent.innerHTML = `
<h2 class="recipeName">${meal.strMeal}</h2>
<h3>Ingredients:</h3>
<ul class="ingredientList">${fetchIngredients(meal)}</ul>
<div class="recipeInstructions">
    <h3>Instructions: </h3>
    <p>${meal.strInstructions}</p>
</div>
`;

  recipeDetailsContent.parentElement.style.display = "block";
};

recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display = "none";
})

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  fetchRecipes(searchInput);
  //console.log("button clicked");
});



// the meal Db Api is used here. -- free api, no need to signup
