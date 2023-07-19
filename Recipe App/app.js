const searchBox = document.querySelector('.searchbox');
const searchBtn = document.querySelector('.searchbtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

const fetchRecipe = async (query) => {
    recipeContainer.innerHTML = "<h3>loading</h3>";

    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        let recipes = await response.json();

        recipeContainer.innerHTML = "";
        recipes.meals.forEach((recipe) => {

            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
                <img src="${recipe.strMealThumb}">
                <h3>${recipe.strMeal}</h3>
                <p><span>${recipe.strArea}</span> Dish</p>
                <p>Belongs to <span>${recipe.strCategory}</span> Category</p>`

            const button = document.createElement('button');
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);

            button.addEventListener('click', () => {
                openRecipeModal(recipe)
            })

            recipeContainer.appendChild(recipeDiv);
        })
    }
    catch{
        recipeContainer.innerHTML = "<h3>Error in fetching Recipe...</h3>";
    }
    
};

recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = 'none';
})

const fectchIngredients = (recipe) => {
    console.log("recipe")
    let ingredientList = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        if (ingredient) {
            const measure = recipe[`strMeasure${i}`];
            ingredientList += `<li>${measure} ${ingredient}</li>`;
        }
        else {
            break;
        }
    }
    return ingredientList;
}
const openRecipeModal = (recipe) => {
    recipeDetailsContent.innerHTML = `
        <h2 class="recipename">${recipe.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredientlist">${fectchIngredients(recipe)}</ul>
        <div class="recipeinstructions">
            <h3>Instructions</h3>
            <p>${recipe.strInstructions}</p>
        </div>`;
    recipeDetailsContent.parentElement.style.display = 'block';
}



searchBtn.addEventListener('click', () => {
    console.log("hi");
    let query = searchBox.value.trim();
    if(!query){
        recipeContainer.innerHTML = "<h3>Type any Recipe...</h3>";
        return;
    }
    fetchRecipe(query);
})