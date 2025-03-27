const displayMessages = {
  basicGameRules:
    "Please enter a value between 0-12 to guess the semitone distance between the two notes.",

  success: "Congratulations. You've entered a correct answer.<br>",

  fail: "You've entered an incorrect answer, try again",

  selectedNotes: (currentNotes, restOfNotes) => {
    const boldBlackStyle = "font-weight: bold; color: black;";
    const boldA = `<strong style="${boldBlackStyle}">${currentNotes[0]}</strong>`;
    const boldB = `<strong style="${boldBlackStyle}">${currentNotes[1]}</strong>`;
    return `The notes were: ${boldA}, ${boldB}, ${restOfNotes.join(", ")}`;
  },
  gameEnd: (correctAnswer, correctAnswer2) => {
    return `You've ended the game.<br>The answers were ${correctAnswer} clockwise or ${correctAnswer2} counterclockwise.`;
  },
};

const selectors = {
  board: document.getElementById("semitone-notes"),
  showNotesCard: document.querySelector(".show-notes"),
  boardExplanations: document.getElementById("explanations"),
  answerInput: document.getElementById("answer"),
  randomizeNotes: document.getElementById("randomize"),
  submitButton: document.getElementById("submit"),
  boardStreak: document.getElementById("streak"),
  endButton: document.getElementById("stop-game"),
  restartButton: document.getElementById("restart"),
};

const state = {
  streak: 0,
  semitoneData: {},
};

const noteIndexes = {
  A: 0,
  "A#": 1,
  Bb: 1,
  B: 2,
  C: 3,
  "C#": 4,
  Db: 4,
  D: 5,
  "D#": 6,
  Eb: 6,
  E: 7,
  F: 8,
  "F#": 9,
  Gb: 9,
  G: 10,
  "G#": 11,
  Ab: 11,
};

const semitoneIndexes = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
};

const resetShowNotes = `
<div class="first-group">
  <p class="eleven">G#/Ab</p>
  <p class="zero">A</p>
  <p class="one">A#/Bb</p>
</div>

<div class="second-group">
  <p class="ten">G</p>
  <p class="two">B</p>
</div>

<div class="third-group">
  <p class="nine">F#/Gb</p>
  <p class="three">C</p>
</div>

<div class="fourth-group">
  <p class="eight">F</p>
  <p class="four">C#/Db</p>
</div>

<div class="fifth-group">
  <p class="seven">E</p>
  <p class="six">D#/Eb</p>
  <p class="five">D</p>
</div>
`;

const constantStrings = {
  block: "block",
  none: "none",
};

module.exports = {
  displayMessages,
  selectors,
  state,
  noteIndexes,
  semitoneIndexes,
  resetShowNotes,
  constantStrings,
};
