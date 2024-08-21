/*
 * Created on Tue Aug 20 2024
 *
 * Copyright (c) 2024 Hasan Abbas
 */

import { Request, Response } from "express";
import { PuzzleService } from "../services/puzzle.service";

/**
 * PuzzleController handles requests related to puzzle generation.
 */
export class PuzzleController {
  private puzzleService: PuzzleService;

  constructor() {
    this.puzzleService = new PuzzleService();
  }

  /**
   * Generates a puzzle based on the provided grid size and difficulty level.
   *
   * @param req - The HTTP request object containing the grid size and difficulty level.
   * @param res - The HTTP response object used to send the generated puzzle and timer or an error message.
   * @returns A Promise that resolves to void.
   */
  public generatePuzzle = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { size, difficulty } = req.body;
    const gridSize: number = parseInt(size) || 5;
    const puzzleDifficulty: string = difficulty || "easy";

    try {
      const { puzzle, timer } = this.puzzleService.createPuzzle(
        gridSize,
        puzzleDifficulty
      );

      res.json({
        gridSize,
        difficulty: puzzleDifficulty,
        puzzle,
        timer, // Timer in seconds based on difficulty
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to generate puzzle. Please try again." });
    }
  };
}
