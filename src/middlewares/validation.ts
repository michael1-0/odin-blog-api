import { body, query } from "express-validator";

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

export { validateComment, validatePost };
