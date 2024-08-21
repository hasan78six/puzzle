/*
 * Created on Tue Aug 20 2024
 *
 * Copyright (c) 2024 Hasan Abbas
 */

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import constants from "../config/constants";

/**
 * Middleware function to authenticate incoming requests using JWT.
 * Skips authentication for specific routes and methods.
 *
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @param next - The next middleware function in the stack.
 * @returns void
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const nonAuthRoutes: { [key: string]: string[] } = {
    "/user": ["POST"],
    "/auth": ["POST"],
  };

  if (nonAuthRoutes[req.path]?.includes(req.method)) {
    return next();
  }

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
    return;
  }

  jwt.verify(token, constants.JWT_SECRET || "test@123", (err, decoded) => {
    if (err) {
      res.status(401).json({ error: "Unauthorized: Invalid token" });
      return;
    }

    next();
  });
};
