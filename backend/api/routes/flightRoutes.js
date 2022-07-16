import express from "express";
import { Flight } from "../../models/index.js";
import { checkSchema } from "express-validator";
import {
  addFlightValidator,
  retrieveFlightsValidator,
} from "../validators/index.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";

const router = express.Router();

// search
router.post(
  "/flight",
  checkSchema(addFlightValidator),
  validateSchema,
  async ({ body }, res) => {
    await Flight.addFlight(
      body.routeId,
      body.planeId,
      body.departureTime,
      body.arrivalTime,
      body.duration,
      body.price
    );
    res.json({ message: "flight added to system" });
  }
);

// flights
router.get(
  "/",
  checkSchema(retrieveFlightsValidator),
  validateSchema,
  async ({ query }, res) => {
    const { sourceAirport, destAirport, departureDate } = query;

    res.json({
      data: await Flight.findOneWayFlights(
        sourceAirport,
        destAirport,
        departureDate
      ),
    });
  }
);

export default router;
