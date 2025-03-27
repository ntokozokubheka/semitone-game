/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/* module decorator */ module = __webpack_require__.nmd(module);\nconst { JamBuddy } = __webpack_require__(/*! ./jam_buddy.js */ \"./src/jam_buddy.js\");\n\nconst {\n  selectors,\n  state,\n  displayMessages,\n  semitoneIndexes,\n  resetShowNotes,\n  noteIndexes,\n  constantStrings,\n} = __webpack_require__(/*! ./game_objects.js */ \"./src/game_objects.js\");\n\nconst {\n  handleButtonDisplay,\n  resetBoard,\n  updateStreakDisplay,\n  resetStreak,\n  findCorrectAnswer,\n} = __webpack_require__(/*! ./game_helper_functions.js */ \"./src/game_helper_functions.js\");\n\nconst highlightNotes = () => {\n  selectors.showNotesCard.style.display = constantStrings.block;\n  selectors.board.style.display = constantStrings.none;\n  const selectedNotes = state.semitoneData.getCurrentNotes();\n\n  const indexes = selectedNotes.map((note) => noteIndexes[note]);\n\n  indexes.forEach((index, i) => {\n    const note = document.querySelector(`.${semitoneIndexes[index]}`);\n    note.innerHTML = note.innerHTML.replace(\n      new RegExp(selectedNotes[i], \"g\"),\n      `<strong style=\"color: black; background-color: red;\">${selectedNotes[i]}</strong>`\n    );\n  });\n};\n\nconst updateBoardSuccess = () => {\n  selectors.boardExplanations.innerHTML = displayMessages.success;\n  highlightNotes();\n  handleButtonDisplay();\n  resetBoard();\n  state.streak++;\n  updateStreakDisplay();\n};\n\nconst updateBoardFailure = () => {\n  selectors.boardExplanations.innerText = displayMessages.fail;\n  resetStreak();\n  selectors.endButton.disabled = true;\n  setTimeout(() => {\n    selectors.endButton.disabled = false;\n    selectors.boardExplanations.innerText = displayMessages.basicGameRules;\n    selectors.answerInput.value = \"\";\n  }, 3000);\n};\n\nconst setRandomNotes = () => {\n  state.semitoneData = new JamBuddy();\n  state.semitoneData.randomizeCurrentNotes();\n  selectors.board.innerText = state.semitoneData.getCurrentNotes().join(\", \");\n  selectors.boardExplanations.innerText = displayMessages.basicGameRules;\n  selectors.showNotesCard.style.display = constantStrings.none;\n  selectors.board.style.display = constantStrings.block;\n  selectors.answerInput.value = \"\";\n  selectors.answerInput.disabled = false;\n  selectors.submitButton.disabled = false;\n  selectors.showNotesCard.innerHTML = resetShowNotes;\n};\n\nconst handleSubmitButtonClick = (event) => {\n  event.preventDefault();\n\n  const userAnswer = selectors.answerInput.value;\n  selectors.randomizeNotes.disabled = false;\n  if (\n    !isNaN(parseInt(userAnswer)) &&\n    typeof parseInt(userAnswer) === \"number\"\n  ) {\n    const parsedAnswer = parseInt(userAnswer);\n\n    if (parsedAnswer >= 0 && parsedAnswer <= 12) {\n      state.semitoneData.checkAnswer(parsedAnswer)\n        ? updateBoardSuccess()\n        : updateBoardFailure();\n    } else {\n      updateBoardFailure();\n    }\n  } else {\n    updateBoardFailure();\n  }\n};\n\nconst endGame = () => {\n  resetBoard();\n  handleButtonDisplay();\n  selectors.randomizeNotes.disabled = true;\n\n  const correctAnswer = findCorrectAnswer(0, 12);\n  const correctAnswer2 = findCorrectAnswer(12, 0);\n\n  selectors.boardExplanations.innerHTML = displayMessages.gameEnd(\n    correctAnswer,\n    correctAnswer2\n  );\n\n  highlightNotes();\n};\n\nconst restartGame = () => {\n  setRandomNotes();\n  selectors.restartButton.style.display = constantStrings.none;\n  selectors.endButton.style.display = constantStrings.block;\n  selectors.showNotesCard.innerHTML = resetShowNotes;\n  selectors.randomizeNotes.disabled = false;\n  resetStreak();\n};\n\nconst attachEventListeners = () => {\n  document.addEventListener(\"DOMContentLoaded\", function () {\n    selectors.endButton.addEventListener(\"click\", endGame);\n    selectors.restartButton.addEventListener(\"click\", restartGame);\n    selectors.randomizeNotes.addEventListener(\"click\", setRandomNotes);\n    selectors.submitButton.addEventListener(\"click\", handleSubmitButtonClick);\n  });\n};\n\nif (__webpack_require__.c[__webpack_require__.s] === module) {\n  setRandomNotes();\n  attachEventListeners();\n}\n\n//# sourceURL=webpack://ntokozo-kubheka-199-semitone-difference-basic-algorithm-javascript/./src/app.js?");

/***/ }),

/***/ "./src/game_helper_functions.js":
/*!**************************************!*\
  !*** ./src/game_helper_functions.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { selectors, state, constantStrings } = __webpack_require__(/*! ./game_objects.js */ \"./src/game_objects.js\");\n\nconst resetBoard = () => {\n  selectors.answerInput.value = \"\";\n  selectors.answerInput.disabled = true;\n  selectors.submitButton.disabled = true;\n};\n\nconst updateStreakDisplay = () => {\n  selectors.boardStreak.innerText = `Streak : ${state.streak}`;\n};\n\nconst resetStreak = () => {\n  state.streak = 0;\n  updateStreakDisplay();\n};\n\nconst findCorrectAnswer = (start, end) => {\n  for (\n    let i = start;\n    start < end ? i < end : i > end;\n    start < end ? i++ : i--\n  ) {\n    if (state.semitoneData.checkAnswer(i)) {\n      return i;\n    }\n  }\n};\n\nconst handleButtonDisplay = () => {\n  selectors.restartButton.style.display = constantStrings.block;\n  selectors.endButton.style.display = constantStrings.none;\n};\n\nmodule.exports = {\n  resetBoard,\n  updateStreakDisplay,\n  resetStreak,\n  findCorrectAnswer,\n  handleButtonDisplay,\n};\n\n//# sourceURL=webpack://ntokozo-kubheka-199-semitone-difference-basic-algorithm-javascript/./src/game_helper_functions.js?");

/***/ }),

/***/ "./src/game_objects.js":
/*!*****************************!*\
  !*** ./src/game_objects.js ***!
  \*****************************/
/***/ ((module) => {

eval("const displayMessages = {\n  basicGameRules:\n    \"Please enter a value between 0-12 to guess the semitone distance between the two notes.\",\n\n  success: \"Congratulations. You've entered a correct answer.<br>\",\n\n  fail: \"You've entered an incorrect answer, try again\",\n\n  selectedNotes: (currentNotes, restOfNotes) => {\n    const boldBlackStyle = \"font-weight: bold; color: black;\";\n    const boldA = `<strong style=\"${boldBlackStyle}\">${currentNotes[0]}</strong>`;\n    const boldB = `<strong style=\"${boldBlackStyle}\">${currentNotes[1]}</strong>`;\n    return `The notes were: ${boldA}, ${boldB}, ${restOfNotes.join(\", \")}`;\n  },\n  gameEnd: (correctAnswer, correctAnswer2) => {\n    return `You've ended the game.<br>The answers were ${correctAnswer} clockwise or ${correctAnswer2} counterclockwise.`;\n  },\n};\n\nconst selectors = {\n  board: document.getElementById(\"semitone-notes\"),\n  showNotesCard: document.querySelector(\".show-notes\"),\n  boardExplanations: document.getElementById(\"explanations\"),\n  answerInput: document.getElementById(\"answer\"),\n  randomizeNotes: document.getElementById(\"randomize\"),\n  submitButton: document.getElementById(\"submit\"),\n  boardStreak: document.getElementById(\"streak\"),\n  endButton: document.getElementById(\"stop-game\"),\n  restartButton: document.getElementById(\"restart\"),\n};\n\nconst state = {\n  streak: 0,\n  semitoneData: {},\n};\n\nconst noteIndexes = {\n  A: 0,\n  \"A#\": 1,\n  Bb: 1,\n  B: 2,\n  C: 3,\n  \"C#\": 4,\n  Db: 4,\n  D: 5,\n  \"D#\": 6,\n  Eb: 6,\n  E: 7,\n  F: 8,\n  \"F#\": 9,\n  Gb: 9,\n  G: 10,\n  \"G#\": 11,\n  Ab: 11,\n};\n\nconst semitoneIndexes = {\n  0: \"zero\",\n  1: \"one\",\n  2: \"two\",\n  3: \"three\",\n  4: \"four\",\n  5: \"five\",\n  6: \"six\",\n  7: \"seven\",\n  8: \"eight\",\n  9: \"nine\",\n  10: \"ten\",\n  11: \"eleven\",\n};\n\nconst resetShowNotes = `\n<div class=\"first-group\">\n  <p class=\"eleven\">G#/Ab</p>\n  <p class=\"zero\">A</p>\n  <p class=\"one\">A#/Bb</p>\n</div>\n\n<div class=\"second-group\">\n  <p class=\"ten\">G</p>\n  <p class=\"two\">B</p>\n</div>\n\n<div class=\"third-group\">\n  <p class=\"nine\">F#/Gb</p>\n  <p class=\"three\">C</p>\n</div>\n\n<div class=\"fourth-group\">\n  <p class=\"eight\">F</p>\n  <p class=\"four\">C#/Db</p>\n</div>\n\n<div class=\"fifth-group\">\n  <p class=\"seven\">E</p>\n  <p class=\"six\">D#/Eb</p>\n  <p class=\"five\">D</p>\n</div>\n`;\n\nconst constantStrings = {\n  block: \"block\",\n  none: \"none\",\n};\n\nmodule.exports = {\n  displayMessages,\n  selectors,\n  state,\n  noteIndexes,\n  semitoneIndexes,\n  resetShowNotes,\n  constantStrings,\n};\n\n//# sourceURL=webpack://ntokozo-kubheka-199-semitone-difference-basic-algorithm-javascript/./src/game_objects.js?");

/***/ }),

/***/ "./src/helper_functions.js":
/*!*********************************!*\
  !*** ./src/helper_functions.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { errorMessage, notesCircle, convertFlats } = __webpack_require__(/*! ./helper_objects.js */ \"./src/helper_objects.js\")\n\nconst validateNotesPair = (notes) => {\n  const checkFlats =\n    convertFlats.hasOwnProperty(notes[0]) ||\n    convertFlats.hasOwnProperty(notes[1])\n  if (notes.length !== 2 || !Array.isArray(notes))\n    throw new Error(errorMessage.arrayError)\n\n  for (const note of notes) {\n    if (!(notesCircle.includes(note) || checkFlats)) {\n      throw new Error(errorMessage.typeError)\n    }\n  }\n\n  if (notes[0] === notes[1]) {\n    throw new Error(errorMessage.sameNotesError)\n  }\n\n  return notes\n}\n\nconst randomNotes = () => {\n  const shuffled = notesCircle.concat(['Bb', 'Db', 'Eb', 'Ab', 'Gb'])\n\n  const randomizeFunction = () => Math.random() - 0.5\n\n  shuffled.sort(randomizeFunction)\n\n  return [shuffled[0], shuffled[1]]\n}\n\nconst isValidAnswer = (answer, notesArr) => {\n  checkInput(answer)\n  const arr = convertNotes(notesArr)\n  const forwardCount = Math.abs(\n    notesCircle.indexOf(arr[0]) - notesCircle.indexOf(arr[1])\n  )\n\n  const backwardCount = Math.abs(notesCircle.length - forwardCount)\n\n  return answer === forwardCount || answer === backwardCount\n}\n\nconst checkInput = (answer) => {\n  if (!Number.isInteger(answer)) {\n    throw new Error(errorMessage.intError)\n  }\n  if (answer < 0 || answer > 12) {\n    throw new Error(errorMessage.rangeError)\n  }\n}\n\nconst convertNotes = (notes) => {\n  const convertedNotes = []\n\n  if (notesCircle.includes(notes[0])) {\n    convertedNotes.push(notes[0])\n  }\n  if (notesCircle.includes(notes[1])) {\n    convertedNotes.push(notes[1])\n  }\n  if (convertFlats.hasOwnProperty(notes[0])) {\n    convertedNotes.push(convertFlats[notes[0]])\n  }\n  if (convertFlats.hasOwnProperty(notes[1])) {\n    convertedNotes.push(convertFlats[notes[1]])\n  }\n\n  return convertedNotes\n}\n\nmodule.exports = {\n  validateNotesPair,\n  randomNotes,\n  isValidAnswer,\n  checkInput,\n  convertNotes\n}\n\n//# sourceURL=webpack://ntokozo-kubheka-199-semitone-difference-basic-algorithm-javascript/./src/helper_functions.js?");

/***/ }),

/***/ "./src/helper_objects.js":
/*!*******************************!*\
  !*** ./src/helper_objects.js ***!
  \*******************************/
/***/ ((module) => {

eval("const notesCircle = [\n  \"A\",\n  \"A#\",\n  \"B\",\n  \"C\",\n  \"C#\",\n  \"D\",\n  \"D#\",\n  \"E\",\n  \"F\",\n  \"F#\",\n  \"G\",\n  \"G#\",\n];\n\nconst convertFlats = {\n  Bb: \"A#\",\n  Db: \"C#\",\n  Eb: \"D#\",\n  Gb: \"F#\",\n  Ab: \"G#\",\n};\n\nconst errorMessage = {\n  arrayError:\n    \"Please pass an array of 2 notes of type string, e.g., ['A', 'B'] .\",\n  typeError:\n    \"Please pass the correct type which is a semitone note string i.e ['A' ,'B'] .\",\n  sameNotesError: \"Do not pass the same notes .\",\n  intError: \"Enter an integer. Invalid argument data type.\",\n  rangeError: \"Invalid range ,Enter value between 0-12.\",\n};\n\nconst notes = [\n  \"A\",\n  \"A#/Bb\",\n  \"B\",\n  \"C\",\n  \"C#/Db\",\n  \"D\",\n  \"D#/Eb\",\n  \"E\",\n  \"F\",\n  \"F#/Gb\",\n  \"G\",\n  \"G#/Ab\",\n];\n\nmodule.exports = { notesCircle, convertFlats, errorMessage, notes };\n\n//# sourceURL=webpack://ntokozo-kubheka-199-semitone-difference-basic-algorithm-javascript/./src/helper_objects.js?");

/***/ }),

/***/ "./src/jam_buddy.js":
/*!**************************!*\
  !*** ./src/jam_buddy.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const {\n  validateNotesPair,\n  randomNotes,\n  isValidAnswer,\n} = __webpack_require__(/*! ./helper_functions.js */ \"./src/helper_functions.js\");\n\nclass JamBuddy {\n  constructor() {\n    this.notesArray = [];\n  }\n\n  setCurrentNotes(arr) {\n    this.notesArray = validateNotesPair(arr);\n  }\n\n  getCurrentNotes() {\n    return this.notesArray;\n  }\n\n  randomizeCurrentNotes() {\n    this.notesArray = randomNotes();\n  }\n\n  checkAnswer(answer) {\n    return isValidAnswer(answer, this.notesArray);\n  }\n}\n\nmodule.exports = { JamBuddy };\n\n\n//# sourceURL=webpack://ntokozo-kubheka-199-semitone-difference-basic-algorithm-javascript/./src/jam_buddy.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ 	
/******/ })()
;