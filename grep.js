let header = document.querySelector('header');
let section = document.querySelector('section');


let requestURL = './recipe.json';

let request = new XMLHttpRequest();

request.open('GET', requestURL);

request.responseType = 'text';
request.send();

request.onload = function() {
	let superHeroesText = request.response;
	let superHeroes = JSON.parse(superHeroesText);
	// let superHeroes = request.response;
	populateHeader(superHeroes);
	showHeroes(superHeroes);
};

function showHeroes(jsonObj) {
	//用heroers存储json文件里menbers的信息
	let heroes = jsonObj['members'];

	for (let i = 0; i < heroes.length; i++) {
		//创建一系列页面元素
		let myArticle = document.createElement('article');
		let myH2 = document.createElement('h2');
		let myPara1 = document.createElement('p');
		let myPara2 = document.createElement('p');
		let myPara3 = document.createElement('p');
		let myList = document.createElement('ul');

		myH2.textContent = heroes[i].name;
		myPara1.textContent = 'Secret identity: ' + heroes[i].secretIdentity;
		myPara2.textContent = 'Age: ' + heroes[i].age;
		myPara3.textContent = 'Superpowers:';

		let superPowers = heroes[i].powers;
		for(let j = 0; j < superPowers.length; j++) {
			let listItem = document.createElement('li');
			listItem.textContent = superPowers[j];
			myList.appendChild(listItem);
		}

            myArticle.appendChild(myH2);
            myArticle.appendChild(myPara1);
            myArticle.appendChild(myPara2);
            myArticle.appendChild(myPara3);
            myArticle.appendChild(myList);
            section.appendChild(myArticle);
        }
	}
