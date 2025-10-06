const { ScoreBoard } = require("../src/ScoreBoard");

describe("ScoreBoard", () => {
  it("should add a new match to the scoreboard", () => {
    const board = new ScoreBoard();
    board.startMatch("Mexico", "Canada");
    const matches = board.getSummary();
    expect(matches.length).toBe(1);
    expect(matches[0].homeTeam).toBe("Mexico");
    expect(matches[0].awayTeam).toBe("Canada");
    expect(matches[0].homeScore).toBe(0);
    expect(matches[0].awayScore).toBe(0);
  });

  it("should not allow adding a duplicate match", () => {
    const board = new ScoreBoard();

    expect(() => {
      board.startMatch("Poland", "Poland");
    }).toThrow();
  });

  it("should not allow empty team names", () => {
    const board = new ScoreBoard();
    expect(() => {
      board.startMatch("", "Canada");
    }).toThrow();
    expect(() => {
      board.startMatch("Mexico", "");
    }).toThrow();
    expect(() => {
      board.startMatch("", "");
    }).toThrow();
  });

  it("should not allow identical teams", () => {
    const board = new ScoreBoard();
    expect(() => {
      board.startMatch("Spain", "Spain");
    }).toThrow();
  });

  it("should update the score of an existing match", () => {
    const board = new ScoreBoard();
    board.startMatch("Germany", "France");
    board.updateScore("Germany", "France", 2, 1);
    const matches = board.getSummary();
    expect(matches[0].homeScore).toBe(2);
    expect(matches[0].awayScore).toBe(1);
  });

  it("should throw if trying to update a non-existent match", () => {
    const board = new ScoreBoard();
    expect(() => {
      board.updateScore("Italy", "Brazil", 1, 1);
    }).toThrow();
  });

  it("should throw if scores are negative", () => {
    const board = new ScoreBoard();
    board.startMatch("Argentina", "Australia");
    expect(() => {
      board.updateScore("Argentina", "Australia", -1, 0);
    }).toThrow();
    expect(() => {
      board.updateScore("Argentina", "Australia", 0, -2);
    }).toThrow();
  });
});
