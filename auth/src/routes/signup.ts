import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { User } from "../models/user.js";
import { RequestValidationError } from "../errors/request-validation-error.js";
import { BadRequestError } from "../errors/bad-request-error.js";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().isLength({ min: 4, max: 20 }).isString(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email already exists");
    }

    const user = User.build({ email, password });
    await user.save();

    return res.status(201).send(user);
  },
);

export { router as signupRouter };
