
/*
 * The first argument is the list of ingredients in the recipe in our database.
 * The second argument is the list of ingredients that the user has.
 */
function compareIngredient(recipeIngre, userIngre) {
	var i;
	for (i = 0; i < recipeIngre.length; i++) {
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
	for (i = 0; i < recipes.length; i++) {
		var recipe = recipes[i];
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
			if (low.length != 0) low += ", ";
			low += JSON.stringify(recipe);
		}
		else if (recipe['calories'].toUpperCase() == "MEDIUM") {
			if (medium.length != 0) medium += ", ";
			medium += JSON.stringify(recipe);
		}
		else {
			if (high.length != 0) high += ", ";
			high += JSON.stringify(recipe);
		}
	}

	// Then, get the list based on user's preference.
	var retList = [];
	if (calories.toUpperCase() == "LOW") {
		retList += low;
		if ((retList.length != 0) && (medium.length != 0)) {
			retList += (", " + medium);
		}
	}
	else if (calories.toUpperCase() == "MEDIUM") {
		retList += medium;
		if ((retList.length != 0) && (low.length != 0)) {
			retList += (", " + low);
		}
		if ((retList.length != 0) && (high.length != 0)) {
			retList += (", " + high);
		}
	}
	else {
		retList += high;
		if ((retList.length != 0) && (medium.length != 0)) {
			retList += (", " + medium);
		}
	}
	return retList;
}

/*
 * The first argument is the name of the recipe.
 * The second argument is the json obejct.
 */
function parseInstruction(recipe, jsonObj) {
	// All instructions.
	let allRecipes = jsonObj['theInstructions'];
	var ret = [];

	// Travser the instructionFile and get the one in the recipe.
	for (let i = 0; i < theInstructions.length; i++) {
		if (recipe == theInstructions[i]['name']) {
			ret += JSON.stringify(theInstructions[i]);
		}
	}
	return ret;










}
