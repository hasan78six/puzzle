/*
 * Created on Tue Aug 20 2024
 *
 * Copyright (c) 2024 Hasan Abbas
 */

import express from "express";
import routes from "../src/routes";
import constants from "./config/constants";

const app = express();

/**
 * Middleware to parse incoming JSON requests.
 */
app.use(express.json());

/**
 * Mounts the application's routes at the root path.
 */
app.use("/", routes);

const PORT = constants.PORT || 5000;

/**
 * Starts the server on the specified port and logs a message to the console.
 */
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
