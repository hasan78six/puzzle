/*
 * Created on Tue Aug 20 2024
 *
 * Copyright (c) 2024 Hasan Abbas
 */

import express from "express";
import { PuzzleController } from "../../../controllers/puzzle.controller";

const router = express.Router();

const puzzleController = new PuzzleController();

/**
 * Route to generate a new puzzle.
 * Maps POST requests to the root of this route ('/') to the generatePuzzle method of the PuzzleController.
 */
router.post("/", puzzleController.generatePuzzle);

export default router;
