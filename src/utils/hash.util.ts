/*
 * Created on Tue Aug 20 2024
 *
 * Copyright (c) 2024 Hasan Abbas
 */

import * as bcrypt from "bcryptjs";

/**
 * `HashUtil` provides utility functions for hashing data and comparing hashes using bcrypt.
 */
export class HashUtil {
  /**
   * Generates a bcrypt hash from a given input string.
   *
   * @param data - The input string to hash.
   * @returns The resulting bcrypt hash.
   */
  public static async generateHash(
    data: string,
    saltRounds: number = 10
  ): Promise<string> {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(data, salt);
    return hash;
  }

  /**
   * Compares a plain text input with a bcrypt hashed value to see if they match.
   *
   * @param data - The plain text input to compare.
   * @param hashedValue - The bcrypt hash to compare against.
   * @returns True if the plain text matches the hash, false otherwise.
   */
  public static async compareHash(
    data: string,
    hashedValue: string
  ): Promise<boolean> {
    return await bcrypt.compare(data, hashedValue);
  }
}
