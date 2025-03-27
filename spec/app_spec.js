const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");
const index = fs.readFileSync(path.join(__dirname, "../index.html"), "utf-8");
const bundle = fs.readFileSync(
  path.join(__dirname, "../dist/bundle.js"),
  "utf-8"
);

const jsdom = new JSDOM(index, {
  runScripts: "dangerously",
  resources: "usable",
});

document = jsdom.window.document;
const script = document.createElement("script");
script.textContent = bundle;
document.head.appendChild(script);

const {
  selectors,
  displayMessages,
  resetShowNotes,
} = require("../src/game_objects.js");

const {
  returnCorrectAnswer,
  getCurrentNotes,
} = require("./helper_functions.js");

describe("Semitone Game", () => {
  beforeEach(() => {
    selectors.restartButton.click();
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  describe("Randomize functionality", () => {
    it("should set random notes", () => {
      selectors.board.innerText = "";
      selectors.randomizeNotes.click();
      expect(selectors.board.innerText).not.toBe("");
    });

    it("should clear answer input field", () => {
      selectors.answerInput.value = "10";
      selectors.randomizeNotes.click();
      expect(selectors.answerInput.value).toBe("");
    });

    it("should enable answer input field", () => {
      selectors.answerInput.disabled = true;
      selectors.randomizeNotes.click();
      expect(selectors.answerInput.disabled).toBe(false);
    });

    it("should enable submit button", () => {
      selectors.submitButton.disabled = true;
      selectors.randomizeNotes.click();
      expect(selectors.submitButton.disabled).toBe(false);
    });

    it("should unhide semitone board", () => {
      selectors.board.style.display = "";
      selectors.randomizeNotes.click();
      expect(selectors.board.style.display).toBe("block");
    });

    it("should hide highlighted notes board", () => {
      selectors.showNotesCard.style.display = "";
      selectors.randomizeNotes.click();
      expect(selectors.showNotesCard.style.display).toBe("none");
    });

    it("should reset game rules explanations", () => {
      selectors.boardExplanations.innerText = "";
      selectors.randomizeNotes.click();
      expect(selectors.boardExplanations.innerText).toBe(
        displayMessages.basicGameRules
      );
    });

    it("should reset highlighted notes", () => {
      selectors.showNotesCard.innerHTML = "";
      selectors.randomizeNotes.click();
      expect(selectors.showNotesCard.innerHTML.toString()).toBe(resetShowNotes);
    });
  });

  describe("Restart game functionality", () => {
    beforeEach(() => {
      selectors.boardExplanations.innerText = "pre reset";
      selectors.answerInput.value = "";
      selectors.answerInput.disabled = true;
      selectors.submitButton.disabled = true;
      selectors.randomizeNotes.disabled = true;
      selectors.boardStreak.innerText = `900`;
    });

    it("should reset the explanations", () => {
      selectors.restartButton.click();
      expect(selectors.boardExplanations.innerText).toBe(
        displayMessages.basicGameRules
      );
    });

    it("should clear answer input field", () => {
      selectors.answerInput.value = "10";
      selectors.restartButton.click();
      expect(selectors.answerInput.value).toBe("");
    });

    it("should enable answer input field", () => {
      selectors.restartButton.click();
      expect(selectors.answerInput.disabled).toBe(false);
    });

    it("should enable the submit button", () => {
      selectors.restartButton.click();
      expect(selectors.submitButton.disabled).toBe(false);
    });

    it("should enable the randomize button", () => {
      selectors.restartButton.click();
      expect(selectors.randomizeNotes.disabled).toBe(false);
    });

    it("should set the streak to zero for an incorrect input", () => {
      selectors.boardStreak.innerText = "Streak : 7000";
      selectors.restartButton.click();
      expect(selectors.boardStreak.innerText).toBe("Streak : 0");
    });

    it("should reset highlighted notes", () => {
      selectors.showNotesCard.innerHTML = "";
      selectors.restartButton.click();
      expect(selectors.showNotesCard.innerHTML.toString()).toBe(resetShowNotes);
    });

    it("should hide highlighted notes board", () => {
      selectors.showNotesCard.style.display = "";
      selectors.restartButton.click();
      expect(selectors.showNotesCard.style.display).toBe("none");
    });

    it("should unhide semitone board", () => {
      selectors.boardExplanations.innerText = "";
      selectors.restartButton.click();
      expect(selectors.boardExplanations.innerText).toBe(
        displayMessages.basicGameRules
      );
    });

    it("should hide the restart button after clicking it", () => {
      selectors.restartButton.style.display = "";
      selectors.restartButton.click();
      expect(selectors.restartButton.style.display).toBe("none");
    });

    it("should unhide the end game button after clicking it", () => {
      selectors.endButton.style.display = "none";
      selectors.restartButton.click();
      expect(selectors.endButton.style.display).toBe("block");
    });
  });

  describe("End game functionality", () => {
    it("should end game with explanations", () => {
      selectors.endButton.click();
      expect(selectors.boardExplanations.innerHTML).toContain(
        "You've ended the game."
      );
    });

    it("should disable the randomize button", () => {
      selectors.endButton.click();
      expect(selectors.randomizeNotes.disabled).toBe(true);
    });

    it("should disable the answer input", () => {
      selectors.endButton.click();
      expect(selectors.randomizeNotes.disabled).toBe(true);
    });

    it("should disable the submit button", () => {
      selectors.endButton.click();
      expect(selectors.randomizeNotes.disabled).toBe(true);
    });

    it("should highlight selected notes", () => {
      const notes = getCurrentNotes();
      selectors.endButton.click();
      expect(selectors.showNotesCard.innerHTML).toContain(
        `<strong style="color: black; background-color: red;">${notes[0]}</strong>`
      );
      expect(selectors.showNotesCard.innerHTML).toContain(
        `<strong style="color: black; background-color: red;">${notes[1]}</strong>`
      );
    });
  });

  describe("User input incorrect answer functionality", () => {
    afterEach(() => {
      jasmine.clock().tick(3001);
    });

    it("should update the explanations when the answer is incorrect", () => {
      selectors.answerInput.value = "%";
      selectors.submitButton.click();

      expect(selectors.boardExplanations.innerText).toBe(displayMessages.fail);
    });

    it("should set the streak to zero for an incorrect input", () => {
      selectors.boardStreak.innerText = "Streak : 9000";
      selectors.submitButton.click();

      expect(selectors.boardStreak.innerText).toBe("Streak : 0");
    });

    it("should update the explanations after to board game after 3 seconds", () => {
      selectors.boardExplanations.innerText = "before";
      selectors.submitButton.click();
      jasmine.clock().tick(3001);

      expect(selectors.boardExplanations.innerText).toBe(
        displayMessages.basicGameRules
      );
    });

    it("should clear answer input field after 3 seconds", () => {
      selectors.answerInput.value = "10";
      selectors.submitButton.click();
      jasmine.clock().tick(3001);
      expect(selectors.answerInput.value).toBe("");
    });
  });

  describe("User input correct answer functionality", () => {
    beforeEach(() => {
      selectors.answerInput.value = returnCorrectAnswer();
    });

    it("should update the explanations when the answer is incorrect", () => {
      selectors.submitButton.click();
      expect(selectors.boardExplanations.innerHTML).toBe(
        displayMessages.success
      );
    });

    it("should update the streak when the answer is incorrect", () => {
      selectors.submitButton.click();
      expect(selectors.boardStreak.innerText).toBe("Streak : 1");
    });

    it("should clear answer input field", () => {
      selectors.submitButton.click();
      expect(selectors.answerInput.value).toBe("");
    });

    it("should display reset button", () => {
      selectors.submitButton.click();
      expect(selectors.restartButton.style.display).toBe("block");
    });

    it("should hide end button", () => {
      selectors.submitButton.click();
      expect(selectors.endButton.style.display).toBe("none");
    });

    it("should highlight selected notes", () => {
      const notes = getCurrentNotes();

      selectors.submitButton.click();
      expect(selectors.showNotesCard.innerHTML).toContain(
        `<strong style="color: black; background-color: red;">${notes[0]}</strong>`
      );
      expect(selectors.showNotesCard.innerHTML).toContain(
        `<strong style="color: black; background-color: red;">${notes[1]}</strong>`
      );
    });
  });
});