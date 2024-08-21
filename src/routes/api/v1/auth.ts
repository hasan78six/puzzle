/*
 * Created on Tue Aug 20 2024
 *
 * Copyright (c) 2024 Hasan Abbas
 */

import express from "express";
import { AuthController } from "../../../controllers/auth.controller";

const router = express.Router();

const authController = new AuthController();

router.post("/", authController.login);

export default router;
