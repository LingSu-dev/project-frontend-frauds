import express from "express";
import { Route } from "../../models/index.js";
import { checkSchema } from "express-validator";
import { searchValidator } from "../validators/index.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";

const router = express.Router();

// search
router.post(
  "/search",
  checkSchema(searchValidator),
  validateSchema,
  async ({ body }, res) => {
    res.json(
      await Route.search(body.query, body.match, body.include, body.exclude)
    );
  }
);

export default router;
