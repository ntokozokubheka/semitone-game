const notesCircle = [
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
];

const convertFlats = {
  Bb: "A#",
  Db: "C#",
  Eb: "D#",
  Gb: "F#",
  Ab: "G#",
};

const errorMessage = {
  arrayError:
    "Please pass an array of 2 notes of type string, e.g., ['A', 'B'] .",
  typeError:
    "Please pass the correct type which is a semitone note string i.e ['A' ,'B'] .",
  sameNotesError: "Do not pass the same notes .",
  intError: "Enter an integer. Invalid argument data type.",
  rangeError: "Invalid range ,Enter value between 0-12.",
};

const notes = [
  "A",
  "A#/Bb",
  "B",
  "C",
  "C#/Db",
  "D",
  "D#/Eb",
  "E",
  "F",
  "F#/Gb",
  "G",
  "G#/Ab",
];

module.exports = { notesCircle, convertFlats, errorMessage, notes };