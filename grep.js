
/*
 * The first argument is the list of ingredients in the recipe in our database.
 * The second argument is the list of ingredients that the user has.
 */
function compareIngredient(recipeIngre, userIngre) {
	var i;
	for (i = 0; i < userIngre.length; i++) {
	  if (userIngre.includes(recipeIngre[i]) == false) return 0;
	}
	return 1;
}

/*
 * The first argument is the list of tags in the recipe in our database.
 * The second argument is the list of tags that the user has.
 */
function compareTag(recipeTag, userTag) {
	var i;
	for (i = 0; i < userTag.length; i++) {
		if (recipeTag.includes(userTag[i]) == false) return 0;
	}
	return 1;
}


/*
 * jsonObj: the json object storing the recipe
 * requirements: user input. Format:
 * {
 *   "ingredients": [],
 *   "calories": "",
 *   "tags": []
 * }
 */
function selectRecipe(jsonObj, requirements) {
	// All recipes.
	let allRecipes = jsonObj['recipes'];

	// All ingredients.
	let ingredients = requirements['ingredients'];
	// All tags.
	let tags = requirements['tags'];
	// Selection of calory.
	let calories = requirements['calories'];

	// A list to store all available recipes after the first round of selection:
	// looking for ingredients.
	var firstRoundList = [];

	let i = 0;

	// Traverse the list of recipes and filter ingredients.
	for (i = 0; i < allRecipes.length; i++) {
		var recipe = allRecipes[i];
		if (compareIngredient(recipe['ingredients'], ingredients) == 1) {
			firstRoundList = firstRoundList.concat(recipe);
		}
	}
	if (firstRoundList.length == 0) return [];

	// Start the second round, matching tags.
	var secondRoundList = [];

	// Traverse the list of tags and filter ingredients.
	for (i = 0; i < firstRoundList.length; i++) {
		var recipe = firstRoundList[i];
		if (compareTag(recipe['tags'], tags) == 1) {
			secondRoundList = secondRoundList.concat(recipe);
		}
	}
	if (secondRoundList.length == 0) return [];

	// Start the third round.
	var low = [];
	var medium = [];
	var high = [];

	// Firstly, sort the recipe based on calory from the resulted list.
	for (i = 0; i < secondRoundList.length; i++) {
		var recipe = secondRoundList[i];
		if (recipe['calories'].toUpperCase() == "LOW") {
			low.concat(recipe);
		}
		else if (recipe['calories'].toUpperCase() == "MEDIUM") {
			medium.concat(recipe);
		}
		else {
			high.concat(recipe);
		}
	}

	// Then, get the list based on user's preference.
	var retList = [];
	if (calories.toUpperCase() == "LOW") {
		retList.concat(low, medium);
	}
	else if (calories.toUpperCase() == "MEDIUM") {
		retList.concat(medium, low, high);
	}
	else {
		retList.concat(high, medium);
	}

	return retList;


}
