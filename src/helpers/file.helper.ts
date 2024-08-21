/*
 * Created on Tue Aug 20 2024
 *
 * Copyright (c) 2024 Hasan Abbas
 */

import * as fs from "fs";
import * as path from "path";
import { FileHelperOptions } from "../types/FileHelperOptions";

/**
 * `FileHelper` provides utility functions for reading and writing files synchronously.
 */
export class FileHelper {
  /**
   * Reads a file synchronously and returns its contents as a string.
   *
   * @param filePath - The path to the file to be read.
   * @param options - Optional settings for file reading such as encoding.
   * @returns The contents of the file as a string.
   * @throws Will throw an error if the file cannot be read.
   */
  public static async readFileSync(
    filePath: string,
    options?: FileHelperOptions
  ): Promise<string> {
    try {
      const encoding = options?.encoding || "utf-8";
      return fs.readFileSync(filePath, { encoding });
    } catch (error: any) {
      console.error(`Error reading file: ${filePath}`, error);
      throw error;
    }
  }

  /**
   * Writes data to a file synchronously, creating any necessary directories.
   *
   * @param filePath - The path to the file where data will be written.
   * @param data - The string data to be written to the file.
   * @param options - Optional settings for file writing such as encoding.
   * @throws Will throw an error if the file cannot be written.
   */
  public static writeFileSync(
    filePath: string,
    data: string,
    options?: FileHelperOptions
  ): void {
    try {
      const encoding = options?.encoding || "utf-8";
      const dir = path.dirname(filePath);

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(filePath, data, { encoding });
      console.log(`File written successfully: ${filePath}`);
    } catch (error: any) {
      console.error(`Error writing file: ${filePath}`, error);
      throw error;
    }
  }
}
