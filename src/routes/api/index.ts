/*
 * Created on Tue Aug 20 2024
 *
 * Copyright (c) 2024 Hasan Abbas
 */

import express from "express";
import v1Routes from "./v1";

const router = express.Router();

/**
 * Sets up version 1 (v1) API routes under the '/v1' path.
 * All routes defined in `v1Routes` will be prefixed with '/v1'.
 */
router.use("/v1", v1Routes);

export default router;
