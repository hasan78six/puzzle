/*
 * Created on Tue Aug 20 2024
 *
 * Copyright (c) 2024 Hasan Abbas
 */

import path from "path";
import { User } from "../models/User";
import { HashUtil } from "../utils/hash.util";
import { IdentityUtil } from "../utils/identity.util";
import { FileHelper } from "../helpers/file.helper";
import { Puzzle } from "../types/Puzzle";

const usersFilePath = path.join(__dirname, "../../data/users.json");

/**
 * `UserRepository` handles the storage and retrieval of user data.
 */
export class UserRepository {
  /**
   * Retrieves all users from the file system.
   *
   * @returns A Promise that resolves to an array of `User` objects.
   */
  private async getUsers(): Promise<User[]> {
    let data = await FileHelper.readFileSync(usersFilePath);

    if (data) {
      return JSON.parse(data);
    }

    return [];
  }

  /**
   * Saves the given users array to the file system.
   *
   * @param users - An array of `User` objects to save.
   */
  private save(users: User[]): void {
    FileHelper.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  }

  /**
   * Creates a new user with the given username, email, and password.
   * The password is hashed before saving the user.
   *
   * @param username - The username of the new user.
   * @param email - The email address of the new user.
   * @param password - The plaintext password of the new user.
   * @returns A Promise that resolves to the newly created `User` object.
   */
  public async createUser(
    username: string,
    email: string,
    password: string
  ): Promise<User> {
    const hashedPassword = await HashUtil.generateHash(password);

    const newUser: User = {
      id: IdentityUtil.generateId(),
      username,
      email,
      password: hashedPassword,
    };

    const users = await this.getUsers();

    users.push(newUser);

    this.save(users);

    return newUser;
  }

  /**
   * Finds a user by their email address.
   *
   * @param email - The email address to search for.
   * @returns A Promise that resolves to the `User` object or `undefined` if not found.
   */
  public async findUserByEmail(email: string): Promise<User | undefined> {
    const users = await this.getUsers();

    if (Array.isArray(users) && users.length > 0) {
      return users.find((user) => user.email === email);
    } else {
      return undefined;
    }
  }

  /**
   * Finds a user by their username.
   *
   * @param username - The username to search for.
   * @returns A Promise that resolves to the `User` object or `undefined` if not found.
   */
  public async findUserByUsername(username: string): Promise<User | undefined> {
    const users = await this.getUsers();

    if (Array.isArray(users) && users.length > 0) {
      return users.find((user) => user.username === username);
    } else {
      return undefined;
    }
  }

  /**
   * Finds a user by their ID.
   *
   * @param id - The unique ID of the user to search for.
   * @returns A Promise that resolves to the `User` object or `undefined` if not found.
   */
  public async findUserById(id: string): Promise<User | undefined> {
    const users = await this.getUsers();

    if (Array.isArray(users) && users.length > 0) {
      return users.find((user) => user.id === id);
    } else {
      return undefined;
    }
  }

  /**
   * Saves a completed puzzle for a user.
   *
   * @param userId - The unique ID of the user.
   * @param puzzle - The puzzle object to save.
   * @returns A Promise that resolves to the updated `User` object or `undefined` if the user is not found.
   * @throws Will throw an error if the user with the provided ID is not found.
   */
  public async savePuzzle(
    userId: string,
    puzzle: Puzzle
  ): Promise<User | undefined> {
    const users = await this.getUsers();

    const user = users.find((user) => user.id === userId);

    if (!user) {
      throw new Error(`User with id ${userId} not found.`);
    }

    if (!user.puzzles) {
      user.puzzles = [];
    }

    user.puzzles.push(puzzle);

    this.save(users);

    return user;
  }
}