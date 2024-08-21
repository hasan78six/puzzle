/*
 * Created on Tue Aug 20 2024
 *
 * Copyright (c) 2024 Hasan Abbas
 */

import express from "express";
import apiRoutes from "./api";

const router = express.Router();

/**
 * Sets up the API routes under the '/api' path.
 * All routes defined in `apiRoutes` will be prefixed with '/api'.
 */
router.use("/api", apiRoutes);

export default router;
