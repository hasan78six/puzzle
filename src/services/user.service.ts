/*
 * Created on Tue Aug 20 2024
 *
 * Copyright (c) 2024 Hasan Abbas
 */

import { User } from "../models/User";
import { UserRepository } from "../repositories/users.repository";
import bcrypt from "bcryptjs";

/**
 * `UserService` provides services for managing users, including finding users by email or username, creating new users, and saving puzzles.
 */
export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * Finds a user by their email address.
   *
   * @param email - The email address of the user to find.
   * @returns A Promise that resolves to the `User` object if found, or `undefined` if not.
   */
  public async findUserByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findUserByEmail(email);
  }

  /**
   * Finds a user by their username.
   *
   * @param username - The username of the user to find.
   * @returns A Promise that resolves to the `User` object if found, or `undefined` if not.
   */
  public async findUserByUsername(username: string): Promise<User | undefined> {
    return await this.userRepository.findUserByUsername(username);
  }

  /**
   * Creates a new user with the given username, email, and password.
   *
   * The password is hashed before saving the user.
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
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return await this.userRepository.createUser(
      username,
      email,
      hashedPassword
    );
  }

  /**
   * Finds a user by their ID.
   *
   * @param id - The unique ID of the user to find.
   * @returns A Promise that resolves to the `User` object if found, or `undefined` if not.
   */
  public async findUserById(id: string): Promise<User | undefined> {
    return await this.userRepository.findUserById(id);
  }

  /**
   * Saves a puzzle completed by a user.
   *
   * @param userId - The unique ID of the user who completed the puzzle.
   * @param puzzle - The puzzle object to save.
   * @returns A Promise that resolves to the updated `User` object or `undefined` if the user is not found.
   */
  public async savePuzzle(userId: string, puzzle: any): Promise<any> {
    return await this.userRepository.savePuzzle(userId, puzzle);
  }
}
