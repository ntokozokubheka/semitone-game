const { JamBuddy } = require("../src/jam_buddy.js");
const { errorMessage } = require("../src/helper_objects.js");

describe("JamBuddy Class", () => {
  let testJam, testArray, testArrayTwo;
  beforeEach(() => {
    testJam = new JamBuddy();
    testArray = ["A", "A#"];
    testArrayTwo = ["Ab", "A"];
  });

  describe("setCurrentNotes function", () => {
    it("should set an array of two valid notes", () => {
      testJam.setCurrentNotes(testArray);
      expect(testJam.notesArray).toEqual(testArray);
    });

    it("should throw errors for invalid notes entries", () => {
      const invalidValueOne = ["A", "A"];
      const invalidValueTwo = ["A"];
      const invalidValueThree = [1, 1];
      const invalidValueFour = ["%", "A"];

      expect(() => testJam.setCurrentNotes(invalidValueOne)).toThrowError(
        errorMessage.sameNotesError
      );
      expect(() => testJam.setCurrentNotes(invalidValueTwo)).toThrowError(
        errorMessage.arrayError
      );
      expect(() => testJam.setCurrentNotes(invalidValueThree)).toThrowError(
        errorMessage.typeError
      );
      expect(() => testJam.setCurrentNotes(invalidValueFour)).toThrowError(
        errorMessage.typeError
      );
    });
  });

  describe("getCurrentNotes function", () => {
    it("should return an array of two valid notes (non flats)", () => {
      testJam.setCurrentNotes(testArray);
      expect(testJam.getCurrentNotes()).toEqual(testArray);
    });
    it("should return an array of two valid notes containing a flat note", () => {
      testJam.setCurrentNotes(testArrayTwo);
      expect(testJam.getCurrentNotes()).toEqual(testArrayTwo);
    });
  });

  describe("randomizeCurrentNotes function", () => {
    it("should set a randomized array of two notes", () => {
      const testRandomNotes = testJam.getCurrentNotes();
      testJam.randomizeCurrentNotes();

      expect(testJam.getCurrentNotes()).not.toEqual(testRandomNotes);
    });
  });

  describe("checkAnswer function", () => {
    it("should validate semitone distance when the array does not contain flats", () => {
      testJam.setCurrentNotes(["A", "B"]);

      expect(testJam.checkAnswer(2)).toBe(true);
      expect(testJam.checkAnswer(10)).toBe(true);
      expect(testJam.checkAnswer(11)).toBe(false);
    });

    it("should validate semitone distance when the array contains a flats", () => {
      testJam.setCurrentNotes(testArrayTwo);

      expect(testJam.checkAnswer(1)).toBe(true);
      expect(testJam.checkAnswer(11)).toBe(true);
      expect(testJam.checkAnswer(7)).toBe(false);
    });

    it("should throw errors for invalid data type entries", () => {
      expect(() => testJam.checkAnswer("%")).toThrowError(
        errorMessage.intError
      );
    });

    it("should throw errors for invalid range entries", () => {
      expect(() => testJam.checkAnswer(13)).toThrowError(
        errorMessage.rangeError
      );
    });
  });
});