/*
 * Created on Tue Aug 20 2024
 *
 * Copyright (c) 2024 Hasan Abbas
 */

/**
 * Interface representing the structure of a puzzle.
 */
export interface Puzzle {
  gridSize: number;
  difficulty: string;
  timeTaken: number;
  matrix: number[][];
  score: number;
  timestamp: string;
}
