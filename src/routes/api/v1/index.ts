/*
 * Created on Tue Aug 20 2024
 *
 * Copyright (c) 2024 Hasan Abbas
 */

import express from "express";
import authRoutes from "./auth";
import userRoutes from "./user";
import puzzleRoutes from "./puzzle";
import leaderBoardRoutes from "./leader-board";
import { authenticate } from "../../../middlewares/authentication";

const router = express.Router();

/**
 * Middleware that applies authentication to all routes in this router.
 */
router.use(authenticate);

/**
 * Sets up authentication-related routes under the '/auth' path.
 */
router.use("/auth", authRoutes);

/**
 * Sets up user-related routes under the '/user' path.
 */
router.use("/user", userRoutes);

/**
 * Sets up puzzle-related routes under the '/puzzle' path.
 */
router.use("/puzzle", puzzleRoutes);

/**
 * Sets up leaderboard-related routes under the '/leader-board' path.
 */
router.use("/leader-board", leaderBoardRoutes);

export default router;
