/*
 * Created on Tue Aug 20 2024
 *
 * Copyright (c) 2024 Hasan Abbas
 */

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserService } from "../services/user.service";
import constants from "../config/constants";
import { Puzzle } from "../types/Puzzle";
import { PuzzleService } from "../services/puzzle.service";
import { LeaderBoardService } from "../services/leader-board.service";

/**
 * UserController handles user-related operations such as registration and puzzle saving.
 */
export class UserController {
  private userService: UserService;
  private puzzleService: PuzzleService;
  private leaderBoardService: LeaderBoardService;

  constructor() {
    this.userService = new UserService();
    this.puzzleService = new PuzzleService();
    this.leaderBoardService = new LeaderBoardService();
  }

  /**
   * Registers a new user in the system.
   *
   * @param req - The HTTP request object containing the username, email, and password.
   * @param res - The HTTP response object used to send the access token or an error message.
   * @returns A Promise that resolves to void.
   */
  public register = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;

    try {
      let user = await this.userService.findUserByEmail(email);

      if (user) {
        res.status(400).json({ msg: "User already exists" });

        return;
      }

      let checkUsername = await this.userService.findUserByUsername(username);

      if (checkUsername) {
        res.status(400).json({ msg: "Username already exists" });

        return;
      }

      user = await this.userService.createUser(username, email, password);

      const payload = {
        user: { id: user.id, username: user.username, email: user.email },
      };

      const token = jwt.sign(payload, constants.JWT_SECRET as string, {
        expiresIn: "1h",
      });

      res.status(201).json({ access_token: token });
    } catch (err: any) {
      console.error((err as Error).stack);
      res.status(500).send("Server error");
    }
  };

  /**
   * Saves a puzzle completed by the user and updates the leaderboard.
   *
   * @param req - The HTTP request object containing user ID, grid size, difficulty, time taken, and puzzle matrix.
   * @param res - The HTTP response object used to send the saved puzzle details or an error message.
   * @returns A Promise that resolves to void.
   */
  public savePuzzle = async (req: Request, res: Response): Promise<void> => {
    const { userId, gridSize, difficulty, timeTaken, matrix } = req.body;

    if (!userId || !gridSize || !difficulty || !timeTaken || !matrix) {
      res.status(400).json({ error: "Missing required fields" });

      return;
    }

    let score = this.puzzleService.calculateScore(difficulty, timeTaken);

    const puzzle: Puzzle = {
      gridSize,
      difficulty,
      timeTaken,
      matrix: matrix,
      score: score,
      timestamp: new Date().toISOString(),
    };

    let user = await this.userService.findUserById(userId);

    if (!user) {
      res
        .status(400)
        .json({ msg: "There is no user associated with this id." });

      return;
    }

    let detail = await this.userService.savePuzzle(user.id, puzzle);

    await this.leaderBoardService.addEntry(user.username, score, timeTaken);

    res.status(200).json(detail);
  };
}
