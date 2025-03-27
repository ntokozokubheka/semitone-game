const {
  errorMessage,
  notesCircle,
  convertFlats,
} = require("./helper_objects.js");

const validateNotesPair = (notes) => {
  const checkFlats =
    convertFlats.hasOwnProperty(notes[0]) ||
    convertFlats.hasOwnProperty(notes[1]);
  if (notes.length !== 2 || !Array.isArray(notes))
    throw new Error(errorMessage.arrayError);

  for (const note of notes) {
    if (!(notesCircle.includes(note) || checkFlats)) {
      throw new Error(errorMessage.typeError);
    }
  }

  if (notes[0] === notes[1]) {
    throw new Error(errorMessage.sameNotesError);
  }

  return notes;
};

const randomNotes = () => {
  const shuffled = notesCircle.concat(["Bb", "Db", "Eb", "Ab", "Gb"]);

  const randomizeFunction = () => Math.random() - 0.5;

  shuffled.sort(randomizeFunction);

  return [shuffled[0], shuffled[1]];
};

const isValidAnswer = (answer, notesArr) => {
  checkInput(answer);
  const arr = convertNotes(notesArr);
  const forwardCount = Math.abs(
    notesCircle.indexOf(arr[0]) - notesCircle.indexOf(arr[1])
  );

  const backwardCount = Math.abs(notesCircle.length - forwardCount);

  return answer === forwardCount || answer === backwardCount;
};

const checkInput = (answer) => {
  if (!Number.isInteger(answer)) {
    throw new Error(errorMessage.intError);
  }
  if (answer < 0 || answer > 12) {
    throw new Error(errorMessage.rangeError);
  }
};

const convertNotes = (notes) => {
  const convertedNotes = [];

  if (notesCircle.includes(notes[0])) {
    convertedNotes.push(notes[0]);
  }
  if (notesCircle.includes(notes[1])) {
    convertedNotes.push(notes[1]);
  }
  if (convertFlats.hasOwnProperty(notes[0])) {
    convertedNotes.push(convertFlats[notes[0]]);
  }
  if (convertFlats.hasOwnProperty(notes[1])) {
    convertedNotes.push(convertFlats[notes[1]]);
  }

  return convertedNotes;
};

module.exports = {
  validateNotesPair,
  randomNotes,
  isValidAnswer,
  checkInput,
  convertNotes,
};