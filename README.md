# Live Football World Cup Score Board

## Description
This TypeScript library provides an in-memory scoreboard for live football matches, supporting match start, score update, finish, and summary retrieval with correct ordering.

## Features
- Start a new match (with validation)
- Update match score (with validation)
- Finish a match
- Get a summary of matches ordered by total score and recency

## Usage Example
```typescript
const { ScoreBoard } = require('./src/ScoreBoard');
const board = new ScoreBoard();
board.startMatch('Mexico', 'Canada');
board.updateScore('Mexico', 'Canada', 0, 5);
// ...
const summary = board.getSummary();
```

## Design Notes
- All data is stored in memory.
- The library is designed for use with TypeScript and expects correct types for all arguments.
- Match recency is determined by an internal sequence counter, not by timestamp, to guarantee unique ordering even if matches start at the same time.

## Assumptions
- Team names are unique per match and must be non-empty strings.
- Home and away teams must be different.
- Negative scores are not allowed.
- Attempting to start, update, or finish a non-existent or duplicate match will throw an error.

## Testing
Run tests with:
```bash
npm test
```