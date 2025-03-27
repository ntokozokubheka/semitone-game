const { selectors, state, constantStrings } = require("./game_objects.js");

const resetBoard = () => {
  selectors.answerInput.value = "";
  selectors.answerInput.disabled = true;
  selectors.submitButton.disabled = true;
};

const updateStreakDisplay = () => {
  selectors.boardStreak.innerText = `Streak : ${state.streak}`;
};

const resetStreak = () => {
  state.streak = 0;
  updateStreakDisplay();
};

const findCorrectAnswer = (start, end) => {
  for (
    let i = start;
    start < end ? i < end : i > end;
    start < end ? i++ : i--
  ) {
    if (state.semitoneData.checkAnswer(i)) {
      return i;
    }
  }
};

const handleButtonDisplay = () => {
  selectors.restartButton.style.display = constantStrings.block;
  selectors.endButton.style.display = constantStrings.none;
};

module.exports = {
  resetBoard,
  updateStreakDisplay,
  resetStreak,
  findCorrectAnswer,
  handleButtonDisplay,
};
