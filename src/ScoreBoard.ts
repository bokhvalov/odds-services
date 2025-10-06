export interface Match {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
}

class ScoreBoard {
  private matches: Match[] = [];

  startMatch(homeTeam: string, awayTeam: string): void {
    if (!homeTeam || !awayTeam) {
      throw new Error('Team names must not be empty');
    }
    if (homeTeam === awayTeam) {
      throw new Error('Teams must be different');
    }
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

  updateScore(homeTeam:string, awayTeam:string, homeScore:number, awayScore:number):void{
    if(homeScore < 0)throw new Error ('homeScore: score could not be negative')
    if(awayScore < 0)throw new Error ('awayScore: score could not be negative')

    const match = this.matches.find(match => match.homeTeam === homeTeam && match.awayTeam === awayTeam)

    if (!match) throw new Error("Match does not exist")
    
    match.homeScore = homeScore;
    match.awayScore = awayScore;
  }

  getSummary(): Match[] {
    return this.matches;
  }
}

module.exports = { ScoreBoard };
