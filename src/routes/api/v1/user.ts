/*
 * Created on Tue Aug 20 2024
 *
 * Copyright (c) 2024 Hasan Abbas
 */

import express from "express";
import { UserController } from "../../../controllers/user.controller";

const router = express.Router();

const userController = new UserController();

/**
 * Route to register a new user.
 * Maps POST requests to the root of this route ('/') to the register method of the UserController.
 */
router.post("/", userController.register);

/**
 * Route to save a completed puzzle for a user.
 * Maps POST requests to '/puzzle' to the savePuzzle method of the UserController.
 */
router.post("/puzzle", userController.savePuzzle);

export default router;
