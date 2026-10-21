import type { Request, Response } from "express";
import express from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { User } from "../models/user.js";
import { BadRequestError } from "../errors/bad-request-error.js";
import { validateRequest } from "../middlewares/validate-request.js";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().isLength({ min: 4, max: 20 }).isString(),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email already exists");
    }

    const user = User.build({ email, password });
    await user.save();

    const userJwt = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_KEY!,
    );

    req.session = {
      jwt: userJwt,
    };

    return res.status(201).send(user);
  },
);

export { router as signupRouter };
