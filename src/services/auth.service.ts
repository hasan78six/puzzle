/*
 * Created on Tue Aug 20 2024
 *
 * Copyright (c) 2024 Hasan Abbas
 */

import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/users.repository";
import { HashUtil } from "../utils/hash.util";
import constants from "../config/constants";

/**
 * `AuthService` handles user authentication, including validating credentials and generating JWT tokens.
 */
export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * Validates a user's email and password.
   *
   * @param email - The email address of the user attempting to log in.
   * @param password - The plaintext password provided by the user.
   * @returns A Promise that resolves to the user object if credentials are valid.
   * @throws An error if the credentials are invalid.
   */
  public async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isMatch = await HashUtil.compareHash(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid Credentials");
    }

    return user;
  }

  /**
   * Generates a JWT token for a validated user.
   *
   * @param user - The user object for whom the token is being generated.
   * @returns A JWT token as a string, valid for 1 hour.
   */
  public generateToken(user: any): string {
    const payload = {
      user: { id: user.id, email: user.email, username: user.username },
    };
    const token = jwt.sign(payload, constants.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    return token;
  }
}
