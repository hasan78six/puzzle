/*
 * Created on Tue Aug 20 2024
 *
 * Copyright (c) 2024 Hasan Abbas
 */

import { Request, Response } from "express";
import { LeaderBoardService } from "../services/leader-board.service";

/**
 * LeaderBoardController handles requests related to the leaderboard.
 */
export class LeaderBoardController {
  private leaderBoardService: LeaderBoardService;

  /**
   * Constructs an instance of LeaderBoardController and initializes the LeaderBoardService.
   */
  constructor() {
    this.leaderBoardService = new LeaderBoardService();
  }

  /**
   * Retrieves the leaderboard data and sends it in the response.
   *
   * @param req - The HTTP request object.
   * @param res - The HTTP response object used to send the leaderboard data or an error message.
   * @returns A Promise that resolves to void.
   */
  public getLeaderBoard = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const leaderBoard = await this.leaderBoardService.getLeaderBoard();
      res.status(200).json(leaderBoard);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to retrieve leaderboard" });
    }
  };
}
