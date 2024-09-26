const textBox = document.getElementById('ingredient-input');
const searchButton = document.getElementById('search-button');
const mealList = document.getElementById('results-container');
const ingredientsBox = document.querySelector('.ingridients-list');

const tomatoButton = document.getElementById('Tomato');
const onionButton = document.getElementById('Onion');
const garlicButton = document.getElementById('Garlic');
const potatoButton = document.getElementById('Potato');
const chickenButton = document.getElementById('Chicken');
const carrotButton = document.getElementById('Carrot');
const eggButton = document.getElementById('Egg');
const cheeseButton = document.getElementById('Cheese');

let selectedIngredients = [];

// I used chatgpt for this one because i tried really hard to think of a way i can do this, and didnt get an idea, my only idea was giving an onclick function to each button
const ingredientButtons = [
  { button: tomatoButton, name: 'Tomato' },
  { button: onionButton, name: 'Onion' },
  { button: garlicButton, name: 'Garlic' },
  { button: potatoButton, name: 'Potato' },
  { button: chickenButton, name: 'Chicken' },
  { button: carrotButton, name: 'Carrot' },
  { button: eggButton, name: 'Egg' },
  { button: cheeseButton, name: 'Cheese' },
];

ingredientButtons.forEach(({ button, name }) => {
  button.addEventListener('click', () => {
    if (!selectedIngredients.includes(name)) {
      addIngredient(name);
      selectedIngredients.push(name);
      getMealList();
    }
  });
});

searchButton.addEventListener('click', () => {
  const searchInputTxt = textBox.value.trim();

  if (searchInputTxt && !selectedIngredients.includes(searchInputTxt)) {
    addIngredient(searchInputTxt);
    selectedIngredients.push(searchInputTxt);
    textBox.value = '';
    getMealList();
  }
});

function addIngredient(ingredient) {
  const ingredientButton = document.createElement('button');
  ingredientButton.textContent = ingredient;
  ingredientButton.className = 'ingredient';

  ingredientButton.addEventListener('click', () => {
    selectedIngredients = selectedIngredients.filter(
      (ing) => ing !== ingredient
    );
    ingredientButton.remove();
    getMealList();
  });

  ingredientsBox.appendChild(ingredientButton);
}

function getMealList() {
  mealList.innerHTML = '';

  selectedIngredients.forEach((ingredient) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.meals) {
          displayMeals(data.meals);
        }
      })
      .catch((error) => console.error('Error:', error));
  });
}

function displayMeals(meals) {
  meals.forEach((meal) => {
    if (!document.getElementById(`recipe-${meal.idMeal}`)) {
      const recipeDiv = document.createElement('div');
      recipeDiv.className = 'recipe';
      recipeDiv.id = `recipe-${meal.idMeal}`;

      const img = document.createElement('img');
      img.src = meal.strMealThumb;
      img.alt = meal.strMeal;

      const recipeInfo = document.createElement('div');
      recipeInfo.className = 'recipe-info';

      const title = document.createElement('h3');
      title.textContent = meal.strMeal;

      const description = document.createElement('p');
      description.textContent = 'Click to see the full recipe!';

      const button = document.createElement('button');
      button.className = 'recipe-button';
      button.textContent = 'See Recipe';
      button.onclick = () => {
        window.open(`https://www.themealdb.com/meal/${meal.idMeal}`, '_blank');
      };

      recipeInfo.appendChild(title);
      recipeInfo.appendChild(description);
      recipeInfo.appendChild(button);

      recipeDiv.appendChild(img);
      recipeDiv.appendChild(recipeInfo);

      mealList.appendChild(recipeDiv);
    }
  });
}
