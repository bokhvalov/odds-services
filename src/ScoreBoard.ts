export interface Match {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
}

class ScoreBoard {
  private matches: Match[] = [];

  startMatch(homeTeam: string, awayTeam: string): void {
    this.matches.push({
      homeTeam,
      awayTeam,
      homeScore: 0,
      awayScore: 0
    });
  }

  getSummary(): Match[] {
    return this.matches;
  }
}

module.exports = { ScoreBoard };
