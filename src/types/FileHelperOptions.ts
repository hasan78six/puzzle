/*
 * Created on Tue Aug 20 2024
 *
 * Copyright (c) 2024 Hasan Abbas
 */

/**
 * Interface representing options for file operations in the `FileHelper`.
 */
export interface FileHelperOptions {
  /**
   * The character encoding to be used when reading or writing the file.
   * Defaults to 'utf-8' if not specified.
   */
  encoding?: BufferEncoding;

  /**
   * The file system flag to be used (e.g., 'r' for reading, 'w' for writing).
   * Can be undefined if not required.
   */
  flag?: string | undefined;
}
