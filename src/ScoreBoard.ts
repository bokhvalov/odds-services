export interface Match {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  sequence: number; // Unique match order for recency instead of timestamp because of possibility of same-time matches
}

class ScoreBoard {
  private matches: Match[] = [];
  private matchSequence = 0;

  startMatch(homeTeam: string, awayTeam: string): void {
    if (!homeTeam || !awayTeam) {
      throw new Error("Team names must not be empty");
    }
    if (homeTeam === awayTeam) {
      throw new Error("Teams must be different");
    }
    const exists = this.matches.some(
      (m) => m.homeTeam === homeTeam && m.awayTeam === awayTeam
    );
    if (exists) {
      throw new Error("Match already exists");
    }
    this.matches.push({
      homeTeam,
      awayTeam,
      homeScore: 0,
      awayScore: 0,
      sequence: ++this.matchSequence,
    });

    console.log("Match started:", homeTeam, "vs", awayTeam, "at", new Date().toLocaleString());
  }

  updateScore(
    homeTeam: string,
    awayTeam: string,
    homeScore: number,
    awayScore: number
  ): void {
    if (homeScore < 0)
      throw new Error("homeScore: score could not be negative");
    if (awayScore < 0)
      throw new Error("awayScore: score could not be negative");

    const match = this.matches.find(
      (match) => match.homeTeam === homeTeam && match.awayTeam === awayTeam
    );

    if (!match) throw new Error("Match does not exist");

    match.homeScore = homeScore;
    match.awayScore = awayScore;
  }

  finishMatch(homeTeam: string, awayTeam: string): void {
    const index = this.matches.findIndex(
      (m) => m.homeTeam === homeTeam && m.awayTeam === awayTeam
    );
    if (index === -1) {
      throw new Error("Match does not exist");
    }
    this.matches.splice(index, 1);// To Do - save match in archive + endTimeStamp, etc...
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
}

module.exports = { ScoreBoard };
