document.getElementById("wordSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const url = "https://www.themealdb.com/api/json/v1/1/random.php";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      createRecipe(json);
    });


  function createRecipe(json) {
    let recipeTitle = "";
    

    recipeTitle += "<h2>" + json["meals"][0]["strMeal"] + "</h2>";
    recipeTitle += "<p> Recipe Type: " + json["meals"][0]["strCategory"] + "<p>";
    recipeTitle += '<div class="content intro-photo">';
    recipeTitle += '<img class="content" src="' + json["meals"][0]["strMealThumb"] + '" alt="recipe-picture"></img>';
    recipeTitle += "</div>";
    document.getElementById("recipeTitle").innerHTML = recipeTitle;



    let results = "";
    results += '<div class="content intro">';
    results += '<div class="content">';
    results += '<h3>Ingredients</h3>';
    results += "</div>";
    results += '<div class="content">';
    results += "<ul>";

    let hasRecipe = true;
    let placeHolder = 1;
    while (hasRecipe) {
      ingrName = "strIngredient" + placeHolder.toString();
      ingrAmount = "strMeasure" + placeHolder.toString();
      if (json["meals"][0][ingrName] === "" || placeHolder > 20) {
        hasRecipe = false;
        break;
      }
      results += "<li> " + json["meals"][0][ingrAmount] + " " + json["meals"][0][ingrName] + "</li>";
      placeHolder++;
    }
    results += "</ul>";
    results += "</div>";
    results += "</div>";
    document.getElementById("recipeIngredients").innerHTML = results;

    document.getElementById("recipeInstructions").innerHTML = "<h3>Instructions</h3> <p>" + json["meals"][0]["strInstructions"]; + "</p>";


  }
});
