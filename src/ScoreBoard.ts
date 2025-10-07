export interface Match {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  sequence: number; // Unique match order for recency instead of timestamp because of possibility of same-time matches
}

const INITIAL_SCORE = 0;

class ScoreBoard {
  private matches: Match[] = [];
  private matchSequence = 0;

  startMatch(homeTeam: string, awayTeam: string): void {
    this.validateTeamNames(homeTeam, awayTeam);
    this.ensureTeamsAreDifferent(homeTeam, awayTeam);
    this.ensureMatchDoesNotExist(homeTeam, awayTeam);

    this.matches.push({
      homeTeam,
      awayTeam,
      homeScore: INITIAL_SCORE,
      awayScore: INITIAL_SCORE,
      sequence: ++this.matchSequence,
    });

    console.log("Match started:", homeTeam, "vs", awayTeam, "at", new Date().toLocaleString());
  }

  updateScore(homeTeam: string, awayTeam: string, homeScore: number, awayScore: number): void {
    this.validateScore(homeScore, "homeScore");
    this.validateScore(awayScore, "awayScore");

    const match = this.findMatch(homeTeam, awayTeam);

    if (!match) throw new Error("Match does not exist");

    match.homeScore = homeScore;
    match.awayScore = awayScore;
  }

  finishMatch(homeTeam: string, awayTeam: string): void {
    const index = this.findMatchIndex(homeTeam, awayTeam);

    if (index === -1) {
      throw new Error("Match does not exist");
    }
    this.matches.splice(index, 1); // To Do - save match in archive + endTimeStamp, etc...
  }

  getSummary(): Match[] {
    return [...this.matches].sort((a, b) => {
      const totalA = a.homeScore + a.awayScore;
      const totalB = b.homeScore + b.awayScore;
      if (totalA !== totalB) {
        return totalB - totalA; // Descending by total score
      }

      return b.sequence - a.sequence;
    });
  }

  //private helpers
  private validateTeamNames(homeTeam: string, awayTeam: string): void {
    if (!homeTeam || !awayTeam) {
      throw new Error("Team names must not be empty");
    }
  }

  private ensureTeamsAreDifferent(homeTeam: string, awayTeam: string): void {
    if (homeTeam === awayTeam) {
      throw new Error("Teams must be different");
    }
  }

  private ensureMatchDoesNotExist(homeTeam: string, awayTeam: string): void {
    if (this.findMatch(homeTeam, awayTeam)) {
      throw new Error("Match already exists");
    }
  }

  private validateScore(score: number, field: string): void {
    if (score < 0) {
      throw new Error(`${field}: score could not be negative`);
    }
  }

  private findMatch(homeTeam: string, awayTeam: string): Match | undefined {
    return this.matches.find((match) => match.homeTeam === homeTeam && match.awayTeam === awayTeam);
  }

  private findMatchIndex(homeTeam: string, awayTeam: string): number {
    return this.matches.findIndex((match) => match.homeTeam === homeTeam && match.awayTeam === awayTeam);
  }
}

module.exports = { ScoreBoard };
