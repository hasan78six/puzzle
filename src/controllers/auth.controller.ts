/*
 * Created on Tue Aug 20 2024
 *
 * Copyright (c) 2024 Hasan Abbas
 */

import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

/**
 * AuthController class handles authentication-related HTTP requests.
 */
export class AuthController {
  private authService: AuthService;

  /**
   * Constructs an instance of AuthController and initializes the AuthService.
   */
  constructor() {
    this.authService = new AuthService();
  }

  /**
   * Handles the login process by validating user credentials and returning an access token.
   *
   * @param req - The HTTP request object containing the user's email and password.
   * @param res - The HTTP response object used to send the access token or an error message.
   * @returns A Promise that resolves to void.
   */
  public login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
      const user = await this.authService.validateUser(email, password);

      const token = this.authService.generateToken(user);

      res.status(200).json({ access_token: token });
    } catch (err: any) {
      res.status(400).json({ msg: err.message });
    }
  };
}
