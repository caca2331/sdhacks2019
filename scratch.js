document.write("<script type='text/javascript' src='grep.js'></script>");
document.write("<script type='text/javascript' src='recipes.json'></script>");
document.write("<script type='text/javascript' src='theInstructions.json'></script>");

var instruct;
var ingredientString = "[\"egg\"], ";

function parseIngredient(result) {
    // ingredientString = "[" + result + "]";
    ingredientString = "[\"eggs\"]";
}

function getPreference() {
    var string = getTags() + ", " + getCalories();
    return string;
}

function getFinalPreference() {
    let mydata = JSON.parse(JSON.stringify(recipes));
    var argument = "{\"ingredients\": " + ingredientString + getPreference() + "}";
    console.log(argument);
    localStorage.setItem("arguments", argument);
    let text = localStorage.getItem("arguments");
    var obj = JSON.parse(text);

    var result = selectRecipe(mydata, obj);
    result = ("[" + result + "]");
console.log(result);
    var resultJson = JSON.parse(result);
    if (resultJson.length == 0) return [];

    var ins = JSON.parse(JSON.stringify(theInstructions));

    var allInstructions = [];
    for (let i = 0; i < resultJson.length; i++) {
        var name = resultJson[i]['name'];
        if (allInstructions.length != 0) allInstructions += ", ";
        allInstructions += parseInstruction(name, ins);
    }
    allInstructions = ("[" + allInstructions + "]");

    instruct = JSON.parse(allInstructions);
    console.log(instruct);
    return instruct;
}

function getImageName(jsonObj, name) {
    var recipe = jsonObj['recipes'];
    let i = 0;
    for (i = 0; i < recipes.length; i++) {
        if (name == recipes[i]['name']) break;
    }
    return "./food/" + i + ".jpg";
}

//function displayScreen(jsonObj) {
    // var instructions = getFinalPreference();
    // var operations = jsonObj['theInstructions'];

    /* Create recipe_wrapper */
   /* var recipe_wrapper = document.createElement('div');
    recipe_wrapper.className = 'recipe-wrapper';*/

    /* Recursively create each recipe */
   // for (let i = 0; i < instructions.length; i++) {
      /* Create recipe card */
      /*var recipe_card = document.createElement('div');  // ????
      recipe_card.className = 'recipe-card';*/

      // Get the recipe.
      // var recipe = theInstructions[i];
      // mydata = JSON.parse(JSON.stringify(recipes));
      // var imageN = getImageName(mydata, instructions[i]['name']);

      /* TODO: Remember to add image */
      /*var img_wrapper = document.createElement('div');
      img_wrapper.className = 'recipe-img-wrapper';
      img_wrapper.style.backgroundImage = "url(\'" + imageN + "\')";
      recipe_card.appendChild(img_wrapper);*/

      /* TODO: Create recipe name container */
      /*var recipe_name_wrapper = document.createElement('div');
      recipe_name_wrapper.className = 'recipe-name-wrapper';
      recipe_name_wrapper.innerHTML += instructions[i]['name'];
      recipe_card.appendChild(recipe_name_wrapper);*/

      /* TODO: Create main instructions container */
      /*var recipe_text_wrapper = document.createElement('div');
      recipe_text_wrapper.className = 'recipe-text-wrapper';
      var recipe_instruction_list = document.createElement('ol');*/

//       var instrucs = recipe['instructions'];
//       /* TODO: Recursively add 'li' to 'ol' */
//       for (let j = 0; j < instrucs.length; j++) {
//         var recipe_single_instruction = document.createElement('li');
//         recipe_single_instruction.innerHTML = JSON.stringify(instrucs[j]);
//         // var instruction_text = JSON.stringify(instrucs[j]);  /* Get single string here */
//         // recipe_single_instruction.appendChild(instruction_text);
//         recipe_instruction_list.appendChild(recipe_single_instruction);
//       }
//       recipe_text_wrapper.appendChild(recipe_instruction_list);
//       recipe_card.appendChild(recipe_text_wrapper);
//
//       recipe_wrapper.appendChild(recipe_card);
//       //let section = document.getElementById('sec');
//       //section.appendChild(recipe_wrapper);
//     }
// }*/
