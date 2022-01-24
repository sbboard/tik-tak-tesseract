let questions = [
  {
    question: "Who would be your Succession bestie?",
    options: ["Marcia Roy", "Iverson Roy", "Cyd Peach", "Karl Muller"],
  },
  {
    question: "What would you be doing at the next Roy wedding?",
    options: [
      "Smoking a blunt",
      "Schmoozing the celebs",
      "Killing a kid    ",
      "Getting killed by Kendall",
    ],
  },
  {
    question: "What are you getting Kendall for his birthday?",
    options: ["Snakers", "Some blow", "An iPod", "Something homemade"],
  },
  {
    question: "Tom asks you to eat raw birds with him. What do you do?",
    options: [
      "Eat the bird.",
      "Hide the bird in your coat and pretend like you ate it.",
      "Offer him your bird.",
      "Cheat on Tom. You never loved him.",
    ],
  },
  {
    question: "Logan is having another episode! What do you do?",
    options: [
      "Call 911",
      "Pretend it isn't happening",
      "Film it for blackmail.",
      "Use this opportunity to try to take over the company.",
    ],
  },
  {
    question: "Willa threw your iPad off of the yacht. What do you do?",
    options: [
      "Buy another iPad.",
      "Dive in the water to get your iPad back.",
      "Complain to Conner that he owes you a new iPad.",
      "Pay Willa to marry you.",
    ],
  },
  {
    question: "Who are you voting for in the next election?",
    options: ["Gil Eavis", "Jeryd Mencken", "The Little Raisen", "Conner Roy"],
  },
];
let responses = [
  "You are cousin greg. You are a tall and handsome young man who doesn't like to take his shoes off.",
  "Yup, still cousin greg. You're a 10/10 lackey with a love for chilling and a love for money. Dont get too addicted to coke now, okay?",
  "Looks like you're still cousin greg. You want to ask out Adam Friedland's ex-fiance but then once you get her you're gonna want to cheat on her with some princess or something.",
  "Admit it - you're undeniably cousin greg.",
  "You fucking idiot. You are cousin greg. There has never been any doubt, nor will there be any doubt. You are cousin greg! You're a flip-flopping little worm who loves a tickle from his friend Tom!",
  "No! You're not allowed to retake the quiz! Go away cousin greg!",
];
let responseStep = 0;
let currentQuizStep = 0;
let mainSection = document.querySelector("#main");

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

function init() {
  shuffle(questions);
  postQuestion();
}

function nextQuestion() {
  if ((currentQuizStep + 1) % 3 != 0) {
    if (currentQuizStep == questions.length) {
      shuffle(questions);
      currentQuizStep = 0;
    } else {
      currentQuizStep++;
    }
    postQuestion();
  } else {
    postResult();
  }
}

function postQuestion() {
  questions[currentQuizStep].options = shuffle(
    questions[currentQuizStep].options
  );
  let html = [
    '<div class="q-section">',
    "<h2>",
    questions[currentQuizStep].question,
    "</h2>",
    '<div class="ansSection"><ul>',
    "<li onclick='nextQuestion()'>",
    questions[currentQuizStep].options[0],
    "</li>",
    "<li onclick='nextQuestion()'>",
    questions[currentQuizStep].options[1],
    "</li>",
    "<li onclick='nextQuestion()'>",
    questions[currentQuizStep].options[2],
    "</li>",
    "<li onclick='nextQuestion'>",
    questions[currentQuizStep].options[3],
    "</li>",
    "</ul></div></div>",
  ].join("");
  mainSection.innerHTML = html;
}

function postResult() {
  let html = [
    "<div class='a-section'>",
    responses[responseStep],
    '<button onclick="postQuestion()">try again</button>',
    "</div>",
  ].join("");
  mainSection.innerHTML = html;
  currentQuizStep++;
  responseStep++;
}

init();
