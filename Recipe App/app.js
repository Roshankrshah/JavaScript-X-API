const searchBox = document.querySelector('.searchbox');
const searchBtn = document.querySelector('.searchbtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

const btnContainer = document.querySelector('.btn-container');
const btns = document.querySelectorAll('.tab-btn');

let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
let searchBy = 'name';

const recipeDetails = (recipes) => {
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

const recipeListDetails = (recipes) => {
    recipes.meals.forEach((recipe) => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <img src="${recipe.strMealThumb}">
            <h3>${recipe.strMeal}</h3>`

        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);
        recipeContainer.appendChild(recipeDiv);

        button.addEventListener('click', () => {
            url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`;
            fetch(url).then((resp) => resp.json())
                .then((recipeItem) => {
                    recipeItem.meals.forEach((recipe) => {
                        openRecipeModal(recipe);
                    })
                })
                .catch(() => {
                    recipeContainer.innerHTML = "<h1>Error in fetching Recipe...</h1>";
                })
        })
    })

}

const fetchRecipe = async (query) => {
    recipeContainer.innerHTML = `
        <div id="content" class="row">
            <div class="d-flex justify-content-center">
                <img width="50" src="https://samherbert.net/svg-loaders/svg-loaders/oval.svg" style="filter: invert(1)"
                alt="Loading...">
            </div>
        </div>`;

    try {
        let response = await fetch(url + `${query}`);
        let recipes = await response.json();

        recipeContainer.innerHTML = "";
        if (searchBy == 'name') {
            recipeDetails(recipes)
        } else {
            recipeListDetails(recipes);
        }
    }
    catch {
        recipeContainer.innerHTML = "<h1>Error in fetching Recipe...</h1>";
    }

};

recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = 'none';
})

const fectchIngredients = (recipe) => {
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
        </div>
        <div class="icon">
            <a href="${recipe.strYoutube}"><i class="fa-brands fa-youtube"></i></a>
        <div>`;
    recipeDetailsContent.parentElement.style.display = 'block';
}

searchBtn.addEventListener('click', () => {
    let query = searchBox.value.trim();
    if (!query) {
        recipeContainer.innerHTML = "<h1>Provide Any Recipe Name...</h1>";
        return;
    }
    fetchRecipe(query);
})

btnContainer.addEventListener('click', (e) => {
    const id = e.target.dataset.id;
    if(id){
        btns.forEach((btn)=>{
            btn.classList.remove("active");
        })
        e.target.classList.add("active");
    }
    if (id == 'name') {
        url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
        searchBy = 'name';
        searchBox.value= "";
        searchBox.placeholder = "Search Recipe By Name...";
    } else if (id == 'area') {
        url = "https://www.themealdb.com/api/json/v1/1/filter.php?a=";
        searchBy = 'area';
        searchBox.value= "";
        searchBox.placeholder = "Search Recipe By Area e.g. Indian";
    } else if (id == 'category') {
        url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
        searchBy = 'category';
        searchBox.value= "";
        searchBox.placeholder = "Search Recipe By Category e.g. Seafood";
    }
});


