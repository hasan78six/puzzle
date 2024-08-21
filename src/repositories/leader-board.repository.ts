/*
 * Created on Tue Aug 20 2024
 *
 * Copyright (c) 2024 Hasan Abbas
 */

import path from "path";
import { FileHelper } from "../helpers/file.helper";
import { LeaderBoard } from "../models/LeaderBoard";

const boardFilePath = path.join(__dirname, "../../data/board.json");

/**
 * `LeaderBoardRepository` handles the storage and retrieval of leaderboard entries.
 */
export class LeaderBoardRepository {
  /**
   * Retrieves all leaderboard entries from the file system.
   *
   * @returns A Promise that resolves to an array of `LeaderBoard` entries.
   */
  private async getEntries(): Promise<LeaderBoard[]> {
    let data = await FileHelper.readFileSync(boardFilePath);

    if (data) {
      return JSON.parse(data);
    }

    return [];
  }

  /**
   * Saves the given leaderboard entries to the file system.
   *
   * @param entries - An array of `LeaderBoard` entries to save.
   */
  private save(entries: LeaderBoard[]): void {
    FileHelper.writeFileSync(boardFilePath, JSON.stringify(entries, null, 2));
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
    const entry: LeaderBoard = {
      username,
      score,
      timeTaken,
      timestamp: new Date().toISOString(),
    };

    const entries = await this.getEntries();

    entries.push(entry);

    this.save(entries);

    return entry;
  }

  /**
   * Retrieves the leaderboard, sorted by score in descending order.
   *
   * @returns A Promise that resolves to a sorted array of `LeaderBoard` entries.
   */
  public async getLeaderBoard(): Promise<LeaderBoard[]> {
    const fileData = await FileHelper.readFileSync(boardFilePath);

    const entries: LeaderBoard[] = JSON.parse(fileData);

    entries.sort((a, b) => b.score - a.score);

    return entries;
  }
}
