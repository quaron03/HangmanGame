import wordList from "/words.json" assert { type: 'json' };

let word = wordList[Math.floor(Math.random() * wordList.length)].toLowerCase();
let secretWord = [];
let step = 0;
let isLost = false
console.log(word);
let letterBox = document.getElementById('letterBox');
let picture = document.getElementById('picture');
let keyboard = document.getElementById('keyboard');


function createSecretWord() {
	for (let i = 0; i < word.length; i++) {
		secretWord.push('_');
	}
}
function createLetterBox() {
	letterBox.innerHTML = '';
	for (let i = 0; i < word.length; i++) {
		let letter = document.createElement('span');
		letter.className = 'letter';
		letter.textContent = secretWord[i]
		letterBox.appendChild(letter);
	}
}
function buttonClickHandler(event) {
	let clickedButton = event.target;
	let clickedLetter = clickedButton.textContent.toString().toLowerCase();

	if (!isLost) {
		clickedButton.disabled = true;
		let foundLetter = false;
		for (let i = 0; i < word.length; i++) {
			if (clickedLetter == word[i].toLowerCase()) {
				secretWord[i] = word[i];
				foundLetter = true;
				createLetterBox();
				clickedButton.style.background = '#ffd966';
			}
		}
		if (!secretWord.includes('_')) {
			win()
		} else {
			if (foundLetter) {
				createLetterBox();
				clickedButton.style.background = '#ffd966';
			} else {
				pictureStep();
			}
		}
	}
	else {
		lost()
	}
}
keyboard.addEventListener('click', function (event) {
	if (event.target.tagName === 'BUTTON') {
		buttonClickHandler(event);
	}
});

function createAlphabetButtons() {
	for (let i = 0; i < 26; i++) {
		let letter = String.fromCharCode(65 + i);
		let button = document.createElement('button');
		button.className = 'letter';
		button.innerHTML = letter;
		keyboard.appendChild(button);
	}
}
function pictureStep() {
	step++
	switch (step) {
		case 1:
			picture.setAttribute('src', '1.svg')
			break;
		case 2:
			picture.setAttribute('src', '2.svg')
			break;
		case 3:
			picture.setAttribute('src', '3.svg')
			break;
		case 4:
			picture.setAttribute('src', '4.svg')
			break;
		case 5:
			picture.setAttribute('src', '5.svg')
			break;
		case 6:
			picture.setAttribute('src', '6.svg')
			isLost = true;
			lost()
			break;
		default:
			break;
	}
}

function start() {
	letterBox.innerHTML = '';
	keyboard.innerHTML = '';
	createSecretWord()
	createLetterBox();
	createAlphabetButtons();
}
start()

function lost() {
	console.log(
		`You lost! The guessing word was: "${word}". Press "F5" if you wanna try again.`
	);
}
function win() {
	console.log(
		`You won! Press "F5" if you wanna try again.`
	);
}