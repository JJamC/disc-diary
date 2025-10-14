import express, { NextFunction, Request, Response } from "express";
import { apiRouter } from "./src/routes/api-router";
import {
  customError,
  databaseError,
  notFound,
  serverError,
} from "./src/error-handlers";
import cors from "cors"

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.all("/{*any}", notFound);

app.use(databaseError);

app.use(customError);

app.use(serverError);

export default app;
