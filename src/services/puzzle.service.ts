/*
 * Created on Tue Aug 20 2024
 *
 * Copyright (c) 2024 Hasan Abbas
 */

/**
 * `PuzzleService` provides services for generating puzzles and calculating scores based on difficulty and time taken.
 */
export class PuzzleService {
  /**
   * Creates a puzzle grid of the specified size and difficulty.
   *
   * @param size - The size of the puzzle grid (e.g., 5 for a 5x5 grid).
   * @param difficulty - The difficulty level of the puzzle ('easy', 'medium', 'hard').
   * @param maxAttempts - The maximum number of attempts to generate a valid puzzle (default is 10).
   * @returns An object containing the generated puzzle grid and the timer value based on difficulty.
   * @throws Will throw an error if a valid puzzle cannot be generated within the maximum attempts.
   */
  public createPuzzle(
    size: number,
    difficulty: string,
    maxAttempts: number = 10
  ): { puzzle: number[][]; timer: number } {
    const types = Array.from({ length: size }, (_, i) => i + 1);
    let grid: number[][] = Array(size)
      .fill(null)
      .map(() => Array(size).fill(0));
    let timer: number;

    // Set timer based on difficulty
    switch (difficulty.toLowerCase()) {
      case "easy":
        timer = 300; // 5 minutes
        break;
      case "medium":
        timer = 180; // 3 minutes
        break;
      case "hard":
        timer = 120; // 2 minutes
        break;
      default:
        timer = 300; // Default to easy if an unknown difficulty is provided
        break;
    }

    // Attempt to populate the grid while ensuring no repetition in rows and columns
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      grid = Array(size)
        .fill(null)
        .map(() => Array(size).fill(0)); // Reset grid

      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          const availableTypes = types.filter(
            (type) =>
              !grid[i].includes(type) && // Check the row
              !grid.map((row) => row[j]).includes(type) // Check the column
          );

          if (availableTypes.length > 0) {
            const randomType =
              availableTypes[Math.floor(Math.random() * availableTypes.length)];
            grid[i][j] = randomType;
          } else {
            break; // If no type is available, break the loop to retry the puzzle generation
          }
        }
      }

      // Check if the grid was successfully populated
      const isComplete = grid.every((row) => row.every((cell) => cell !== 0));
      if (isComplete) {
        return { puzzle: grid, timer };
      }
    }

    throw new Error(
      "Failed to generate a valid puzzle after maximum attempts."
    );
  }

  /**
   * Calculates the score for a completed puzzle based on difficulty, time taken, and errors.
   *
   * @param difficulty - The difficulty level of the puzzle ('easy', 'medium', 'hard').
   * @param timeTaken - The time taken by the player to complete the puzzle, in seconds.
   * @param errors - The number of errors made by the player (default is 0).
   * @returns The calculated score as a number.
   */
  public calculateScore(
    difficulty: string,
    timeTaken: number,
    errors: number = 0
  ): number {
    let baseScore: number;

    // Determine base score based on difficulty
    switch (difficulty.toLowerCase()) {
      case "easy":
        baseScore = 100;
        break;
      case "medium":
        baseScore = 200;
        break;
      case "hard":
        baseScore = 300;
        break;
      default:
        baseScore = 100; // Default to easy if an unknown difficulty is provided
        break;
    }

    // Deduct points for each error
    let score = baseScore - errors * 10;

    // Adjust score based on time taken (faster times get higher scores)
    score += Math.max(0, baseScore - timeTaken);

    // Ensure score is not negative
    return Math.max(0, score);
  }
}
