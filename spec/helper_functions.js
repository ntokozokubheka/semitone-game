const { isValidAnswer } = require("../src/helper_functions.js");

function getCurrentNotes() {
  const divContent = document.getElementById("semitone-notes").innerText;

  const notes = divContent.split(/\s+/).map((note) => note.trim());

  notes[0] = notes[0].replace(/,+$/, "");

  const extractedNotes = notes.slice(0, 2);
  return extractedNotes;
}

function returnCorrectAnswer() {
  const extractedNotes = getCurrentNotes();

  for (let i = 1; i <= 11; i++) {
    if (isValidAnswer(i, extractedNotes)) {
      return i;
    }
  }
  return 0;
}

module.exports = { returnCorrectAnswer, getCurrentNotes };