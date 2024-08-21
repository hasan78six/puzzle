/*
 * Created on Tue Aug 20 2024
 *
 * Copyright (c) 2024 Hasan Abbas
 */

import { LeaderBoard } from "../models/LeaderBoard";
import { LeaderBoardRepository } from "../repositories/leader-board.repository";

/**
 * `LeaderBoardService` provides services for managing the leaderboard, including adding entries and retrieving the leaderboard data.
 */
export class LeaderBoardService {
  private leaderBoardRepository: LeaderBoardRepository;

  constructor() {
    this.leaderBoardRepository = new LeaderBoardRepository();
  }

  /**
   * Adds a new entry to the leaderboard.
   *
   * @param username - The username of the player.
   * @param score - The score achieved by the player.
   * @param timeTaken - The time taken by the player to complete the puzzle.
   * @returns A Promise that resolves to the newly added `LeaderBoard` entry.
   */
  public async addEntry(
    username: string,
    score: number,
    timeTaken: number
  ): Promise<LeaderBoard> {
    return await this.leaderBoardRepository.addEntry(
      username,
      score,
      timeTaken
    );
  }

  /**
   * Retrieves the leaderboard data.
   *
   * @returns A Promise that resolves to an array of `LeaderBoard` entries, sorted by score in descending order.
   */
  public async getLeaderBoard(): Promise<LeaderBoard[]> {
    console.log(await this.leaderBoardRepository.getLeaderBoard());

    return await this.leaderBoardRepository.getLeaderBoard();
  }
}
