const { JamBuddy } = require("./jam_buddy.js");

const {
  selectors,
  state,
  displayMessages,
  semitoneIndexes,
  resetShowNotes,
  noteIndexes,
  constantStrings,
} = require("./game_objects.js");

const {
  handleButtonDisplay,
  resetBoard,
  updateStreakDisplay,
  resetStreak,
  findCorrectAnswer,
} = require("./game_helper_functions.js");

const highlightNotes = () => {
  selectors.showNotesCard.style.display = constantStrings.block;
  selectors.board.style.display = constantStrings.none;
  const selectedNotes = state.semitoneData.getCurrentNotes();

  const indexes = selectedNotes.map((note) => noteIndexes[note]);

  indexes.forEach((index, i) => {
    const note = document.querySelector(`.${semitoneIndexes[index]}`);
    note.innerHTML = note.innerHTML.replace(
      new RegExp(selectedNotes[i], "g"),
      `<strong style="color: black; background-color: red;">${selectedNotes[i]}</strong>`
    );
  });
};

const updateBoardSuccess = () => {
  selectors.boardExplanations.innerHTML = displayMessages.success;
  highlightNotes();
  handleButtonDisplay();
  resetBoard();
  state.streak++;
  updateStreakDisplay();
};

const updateBoardFailure = () => {
  selectors.boardExplanations.innerText = displayMessages.fail;
  resetStreak();
  selectors.endButton.disabled = true;
  setTimeout(() => {
    selectors.endButton.disabled = false;
    selectors.boardExplanations.innerText = displayMessages.basicGameRules;
    selectors.answerInput.value = "";
  }, 3000);
};

const setRandomNotes = () => {
  state.semitoneData = new JamBuddy();
  state.semitoneData.randomizeCurrentNotes();
  selectors.board.innerText = state.semitoneData.getCurrentNotes().join(", ");
  selectors.boardExplanations.innerText = displayMessages.basicGameRules;
  selectors.showNotesCard.style.display = constantStrings.none;
  selectors.board.style.display = constantStrings.block;
  selectors.answerInput.value = "";
  selectors.answerInput.disabled = false;
  selectors.submitButton.disabled = false;
  selectors.showNotesCard.innerHTML = resetShowNotes;
};

const handleSubmitButtonClick = (event) => {
  event.preventDefault();

  const userAnswer = selectors.answerInput.value;
  selectors.randomizeNotes.disabled = false;
  if (
    !isNaN(parseInt(userAnswer)) &&
    typeof parseInt(userAnswer) === "number"
  ) {
    const parsedAnswer = parseInt(userAnswer);

    if (parsedAnswer >= 0 && parsedAnswer <= 12) {
      state.semitoneData.checkAnswer(parsedAnswer)
        ? updateBoardSuccess()
        : updateBoardFailure();
    } else {
      updateBoardFailure();
    }
  } else {
    updateBoardFailure();
  }
};

const endGame = () => {
  resetBoard();
  handleButtonDisplay();
  selectors.randomizeNotes.disabled = true;

  const correctAnswer = findCorrectAnswer(0, 12);
  const correctAnswer2 = findCorrectAnswer(12, 0);

  selectors.boardExplanations.innerHTML = displayMessages.gameEnd(
    correctAnswer,
    correctAnswer2
  );

  highlightNotes();
};

const restartGame = () => {
  setRandomNotes();
  selectors.restartButton.style.display = constantStrings.none;
  selectors.endButton.style.display = constantStrings.block;
  selectors.showNotesCard.innerHTML = resetShowNotes;
  selectors.randomizeNotes.disabled = false;
  resetStreak();
};

const attachEventListeners = () => {
  document.addEventListener("DOMContentLoaded", function () {
    selectors.endButton.addEventListener("click", endGame);
    selectors.restartButton.addEventListener("click", restartGame);
    selectors.randomizeNotes.addEventListener("click", setRandomNotes);
    selectors.submitButton.addEventListener("click", handleSubmitButtonClick);
  });
};

if (require.main === module) {
  setRandomNotes();
  attachEventListeners();
}