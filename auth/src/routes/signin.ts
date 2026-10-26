import type { Request, Response } from "express";
import express from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request.js";
import { User } from "../models/user.js";
import { BadRequestError } from "../errors/bad-request-error.js";
import { Password } from "../services/password.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Password must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("No user registered with this email");
    }

    const isMatched = await Password.comparePassword(
      existingUser.password,
      password,
    );
    if (!isMatched) {
      throw new BadRequestError("Invalid credentials");
    }

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!,
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  },
);

export { router as signinRouter };
