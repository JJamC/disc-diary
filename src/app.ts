import express, { NextFunction, Request, Response } from "express";
import { DatabaseError } from "pg";
import { apiRouter } from "./routes/api-router";
import {
  badRequest,
  customError,
  databaseError,
  notFound,
} from "./error-handlers";

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.all("/{*any}", notFound);

app.use(databaseError);

app.use(customError);

app.use(badRequest);

export default app;
