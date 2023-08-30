const words = {
  animals: [
    {
      word: "lion",
      help: "The king of the jungle",
    },
    {
      word: "tiger",
      help: "A large, striped cat that lives in Asia",
    },
    {
      word: "bear",
      help: "A large, furry mammal that eats meat",
    },
    {
      word: "elephant",
      help: "The largest land animal on Earth",
    },
    {
      word: "zebra",
      help: "A black and white striped horse-like animal",
    },
    {
      word: "giraffe",
      help: "The tallest land animal on Earth",
    },
    {
      word: "monkey",
      help: "A small, intelligent animal that lives in trees",
    },
    {
      word: "snake",
      help: "A long, limbless reptile that slithers on the ground",
    },
    {
      word: "shark",
      help: "A large, predatory fish that lives in the ocean",
    },
    {
      word: "whale",
      help: "The largest animal on Earth",
    },
  ],
  fruits: [
    {
      word: "apple",
      help: "A red fruit that grows on trees",
    },
    {
      word: "banana",
      help: "A yellow fruit that grows in bunches",
    },
    {
      word: "orange",
      help: "A round, orange fruit that grows on trees",
    },
    {
      word: "grape",
      help: "A small, round fruit that grows in clusters",
    },
    {
      word: "strawberry",
      help: "A red fruit with small seeds on the outside",
    },
    {
      word: "cherry",
      help: "A small, red fruit that grows on trees",
    },
    {
      word: "lemon",
      help: "A sour, yellow fruit that grows on trees",
    },
    {
      word: "lime",
      help: "A sour, green fruit that grows on trees",
    },
    {
      word: "watermelon",
      help: "A large, sweet fruit that is mostly water",
    },
    {
      word: "mango",
      help: "A sweet, yellow fruit that grows in tropical climates",
    },
  ],
  vegetables: [
    {
      word: "carrot",
      help: "A orange vegetable that is good for your eyes",
    },
    {
      word: "tomato",
      help: "A red vegetable that is a fruit botanically",
    },
    {
      word: "potato",
      help: "A white vegetable that is a starchy root",
    },
    {
      word: "cucumber",
      help: "A long, green vegetable that is mostly water",
    },
    {
      word: "broccoli",
      help: "A green vegetable that is a member of the cabbage family",
    },
    {
      word: "cauliflower",
      help: "A white vegetable that is a member of the cabbage family",
    },
    {
      word: "spinach",
      help: "A green leafy vegetable that is high in vitamins",
    },
    {
      word: "lettuce",
      help: "A green leafy vegetable that is often used in salads",
    },
    {
      word: "onion",
      help: "A brown vegetable that is used in many dishes",
    },
    {
      word: "garlic",
      help: "A white vegetable that has a strong smell",
    },
  ],
  cities: [
    {
      word: "New York City",
      help: "The most populous city in the United States",
    },
    {
      word: "Los Angeles",
      help: "The second most populous city in the United States",
    },
    {
      word: "Chicago",
      help: "The third most populous city in the United States",
    },
    {
      word: "London",
      help: "The most populous city in the United Kingdom",
    },
    {
      word: "Tokyo",
      help: "The most populous city in Japan",
    },
    {
      word: "Beijing",
      help: "The capital of China",
    },
    {
      word: "Mumbai",
      help: "The most populous city in India",
    },
    {
      word: "Seoul",
      help: "The capital of South Korea",
    },
    {
      word: "Mexico City",
      help: "The most populous city in Mexico",
    },
    {
      word: "São Paulo",
      help: "The most populous city in Brazil",
    },
  ],
};

let letters = Array.from("abcdefghijklmnopqrstuvwxyz");

let lettersDiv = document.querySelector(".letters-list");

letters.forEach((letter) => {
  let span = document.createElement("span");
  span.innerText = letter.toUpperCase();
  lettersDiv.appendChild(span);
});

//** generate random category */

let categories = Object.keys(words);
let randomCategorie = categories[Math.floor(Math.random() * categories.length)];
document.querySelector(".from").innerText = randomCategorie;

//** random Word from the choosen category */

let word =
  words[randomCategorie][
    Math.floor(Math.random() * words[randomCategorie].length)
  ];
//** Generate the letters  */
console.log(word);
let wordArray = Array.from(word.word);
wordArray = wordArray.map((car) => car.toUpperCase());
let choosenLetters = document.querySelector(".letters");

wordArray.forEach((letter) => {
  let letterSpan = document.createElement("span");
  letter == " "
    ? letterSpan.classList.add("space")
    : letterSpan.classList.add("letter");
  choosenLetters.appendChild(letterSpan);
});

//**  Add event listners  **/

let clickableLetters = Array.from(
  document.querySelectorAll(".letters-list span")
);
let correctLetters = document.querySelector(".letters");
correctLetters = correctLetters.querySelectorAll("*");
//** get the display d-none elements  */

let elements = Array.from(document.querySelectorAll(".element"));
// console.log(elmenets);

clickableLetters.forEach((span) => {
  span.addEventListener("click", () => {
    if (wordArray.includes(span.innerText)) {
      let index = wordArray.indexOf(span.innerText);
      correctLetters[index].innerText = span.innerText;
      wordArray[index] = "";
      document.querySelector(".correct").play();
      if (checkIfWins()) {
        let win = document.querySelector(".winner");
        document.querySelector(".you-win").play();
        endGame();
        win.classList.remove("d-none");
      }
      if (wordArray.indexOf(span.innerText) == -1) {
        span.classList.add("clicked");
      }
    } else {
      span.classList.add("clicked");
      document.querySelector(".wrong").play();
      hangHim();
    }
  });
});

//** add the help */
document.querySelector(".help span").innerText = word.help;

let corrects = Array.from(document.querySelectorAll(".letter"));
function checkIfWins() {
  let win = true;
  corrects.forEach((elm) => {
    if (elm.innerText == "") win = false;
  });
  return win;
}
function check() {
  let elementToRemove = null;
  let shouldBreak = false;

  elements.forEach((element) => {
    if (!shouldBreak && element.classList.contains("d-none")) {
      elementToRemove = element;
      shouldBreak = true; // Set the flag to true to stop further iterations
    }
  });
  return elementToRemove;
}

function hangHim() {
  let elementToRemove = check();
  elementToRemove.classList.toggle("d-none");
  elementToRemove = check();
  if (elementToRemove == null) {
    document.querySelector(".game-over").pause();
    document.querySelector(".game-over").play();
    for (let i = 0; i < wordArray.length; i++) {
      if (correctLetters[i].innerText == "") {
        correctLetters[i].innerText = wordArray[i];
      }
    }
    let lose = document.querySelector(".loser");
    lose.classList.remove("d-none");
    endGame();
  }
}
document.querySelector(".winner span").addEventListener("click", () => {
  location.reload();
});
document.querySelector(".loser span").addEventListener("click", () => {
  location.reload();
});

function endGame() {
  clickableLetters.forEach((elm) => {
    elm.classList.add("clicked");
  });
}
