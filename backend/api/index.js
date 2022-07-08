import express from "express";
import rootRoutes from "./routes/root.js";
import airportRoutes from "./routes/airport.js";
import airlineRoutes from "./routes/airline.js";
import planeRoutes from "./routes/plane.js";
import routeRoutes from "./routes/route.js";
import bodyParser from "body-parser";
import { logger } from "../utils/index.js";
import cors from "cors";

const app = express();

// register middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(({ method, url, body }, _res, next) => {
  logger.info(`${method} ${url} ${JSON.stringify(body)}`);
  next();
});

// register routes
app.use("/api", rootRoutes);
app.use("/api/planes", planeRoutes);
app.use("/api/airlines", airlineRoutes);
app.use("/api/airports", airportRoutes);
app.use("/api/routes", routeRoutes);

export default app;
