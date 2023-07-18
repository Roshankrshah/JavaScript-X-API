const searchBox = document.querySelector('.searchbox');
const searchBtn = document.querySelector('.searchbtn');
const recipeContainer = document.querySelector('.recipe-container');

const fetchRecipe = async ()=>{

    let response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=cake');
    let recipes = await response.json();

    recipeContainer.innerHTML = "";
    recipes.meals.forEach((recipe)=>{
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src="${recipe.strMealThumb}">
        <h3>${recipe.strMeal}</h3>
        <p><span>${recipe.strArea}</span> Dish</p>
        <p>Belongs to <span>${recipe.strCategory}</span> Category</p>`

        recipeContainer.appendChild(recipeDiv);
    })


}

searchBtn.addEventListener('click',()=>{
    console.log("hi");
    fetchRecipe();
})