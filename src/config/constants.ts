/*
 * Created on Tue Aug 20 2024
 *
 * Copyright (c) 2024 Hasan Abbas
 */

import dotenv from "dotenv";
import path from "path";

// Determine the current environment (e.g., 'development', 'production', 'test')
const environment = process.env.NODE_ENV || "development";

// Construct the path to the appropriate .env file based on NODE_ENV
const envFilePath = path.resolve(__dirname, `../../.env.${environment}`);

// Load environment variables from the appropriate .env file
dotenv.config({ path: envFilePath });

// Export the loaded environment variables for use throughout the application
export default process.env;
