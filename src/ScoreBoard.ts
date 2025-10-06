export interface Match {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
}

class ScoreBoard {
  private matches: Match[] = [];

  startMatch(homeTeam: string, awayTeam: string): void {
    const exists = this.matches.some(
      m => m.homeTeam === homeTeam && m.awayTeam === awayTeam
    );
    if (exists) {
      throw new Error('Match already exists');
    }
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
