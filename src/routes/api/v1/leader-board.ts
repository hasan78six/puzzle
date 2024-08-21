/*
 * Created on Tue Aug 20 2024
 *
 * Copyright (c) 2024 Hasan Abbas
 */

import express from "express";
import { LeaderBoardController } from "../../../controllers/leader-board.controller";

const router = express.Router();

const leaderBoardController = new LeaderBoardController();

/**
 * Route to get the leaderboard.
 * Maps GET requests to the root of this route ('/') to the getLeaderBoard method of the LeaderBoardController.
 */
router.get("/", leaderBoardController.getLeaderBoard);

export default router;
