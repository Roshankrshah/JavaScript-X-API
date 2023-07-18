const searchBox = document.querySelector('.searchbox');
const searchBtn = document.querySelector('.searchbtn');
const recipeContainer = document.querySelector('.recipe-container');

const fetchRecipe = async (query)=>{
    recipeContainer.innerHTML = "<h3>loading</h3>";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
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

        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);
        
        recipeContainer.appendChild(recipeDiv);
    })


}

searchBtn.addEventListener('click',()=>{
    console.log("hi");
    let query = searchBox.value.trim();
    fetchRecipe(query);
})