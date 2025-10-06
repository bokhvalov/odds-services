const { ScoreBoard } = require('../src/ScoreBoard');

describe('ScoreBoard', () => {
  it('should add a new match to the scoreboard', () => {
    const board = new ScoreBoard();
    board.startMatch('Mexico', 'Canada');
    const matches = board.getSummary();
    expect(matches.length).toBe(1);
    expect(matches[0].homeTeam).toBe('Mexico');
    expect(matches[0].awayTeam).toBe('Canada');
    expect(matches[0].homeScore).toBe(0);
    expect(matches[0].awayScore).toBe(0);
  });
});
