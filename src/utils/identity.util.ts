/*
 * Created on Tue Aug 20 2024
 *
 * Copyright (c) 2024 Hasan Abbas
 */

import {
  v4 as uuidv4,
  validate as uuidValidate,
  version as uuidVersion,
} from "uuid";

/**
 * `IdentityUtil` provides utility functions for generating and validating unique identifiers (UUIDs and random alphanumeric IDs).
 */
export class IdentityUtil {
  /**
   * Generates a new UUID (Version 4).
   *
   * @returns A new UUID string.
   */
  public static generateId(): string {
    return uuidv4();
  }

  /**
   * Validates if a given string is a valid UUID.
   *
   * @param id - The ID string to validate.
   * @returns True if the string is a valid UUID, false otherwise.
   */
  public static isValidId(id: string): boolean {
    return uuidValidate(id) && uuidVersion(id) === 4;
  }

  /**
   * Extracts the timestamp from a UUID (Version 1).
   *
   * This function is provided for UUID v1 (time-based) only.
   * @param id - The UUID string to extract the timestamp from.
   * @returns The timestamp as a Date object or null if the UUID is not version 1.
   */
  public static extractTimestamp(id: string): Date | null {
    if (uuidVersion(id) !== 1) {
      return null;
    }

    // Extract the timestamp from the UUID (bytes 0-7, big-endian)
    const hexTime = id.slice(0, 8) + id.slice(9, 13);
    const time = parseInt(hexTime, 16) - 122192928000000000;

    return new Date(time / 10000);
  }

  /**
   * Generates a random alphanumeric ID with a specified length.
   *
   * @param length - The length of the ID to generate.
   * @returns A random alphanumeric ID string.
   */
  public static generateRandomId(length: number): string {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
  }
}
