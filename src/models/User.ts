/*
 * Created on Tue Aug 20 2024
 *
 * Copyright (c) 2024 Hasan Abbas
 */

import { Puzzle } from "../types/Puzzle";

/**
 * Interface representing a user in the system.
 */
export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  puzzles?: Array<Puzzle>;
}
