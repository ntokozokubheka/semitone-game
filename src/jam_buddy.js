const {
  validateNotesPair,
  randomNotes,
  isValidAnswer,
} = require("./helper_functions.js");

class JamBuddy {
  constructor() {
    this.notesArray = [];
  }

  setCurrentNotes(arr) {
    this.notesArray = validateNotesPair(arr);
  }

  getCurrentNotes() {
    return this.notesArray;
  }

  randomizeCurrentNotes() {
    this.notesArray = randomNotes();
  }

  checkAnswer(answer) {
    return isValidAnswer(answer, this.notesArray);
  }
}

module.exports = { JamBuddy };