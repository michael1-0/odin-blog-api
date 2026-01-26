import { body, query } from "express-validator";
import { prisma } from "../db/prisma.ts";

const validatePost = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title should not be empty")
    .isLength({ min: 2, max: 255 })
    .withMessage("Title should be between 2 and 255 characters")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Title should contain only letters, spaces"),
  body("content")
    .trim()
    .notEmpty()
    .isLength({ max: 2500 })
    .withMessage("Content should be 2500 chars max"),
  body("published")
    .notEmpty()
    .withMessage("Published should not be empty")
    .isBoolean()
    .withMessage("Published should be boolean"),
];

const validateComment = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content should not be empty")
    .isLength({ min: 1, max: 1000 })
    .withMessage("Content should be 1 to 1000 chars max"),
  body("username")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage("Username should be 1 to 20 characters max")
    .isAlphanumeric()
    .withMessage("Username should be only letters and numbers"),
  query("postId")
    .notEmpty()
    .withMessage("postId should not be empty")
    .isInt()
    .withMessage("postId should be only integer"),
];

const validateSignup = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage("Email must not exceed 255 characters")
    .custom(async (value) => {
      const user = await prisma.user.findUnique({ where: { email: value } });
      if (user) {
        throw new Error("Email is already in use");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Please confirm your password")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
];

const validateLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address"),

  body("password").notEmpty().withMessage("Password is required"),
];

export { validateComment, validatePost, validateSignup, validateLogin };
