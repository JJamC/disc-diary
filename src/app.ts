import express, { NextFunction, Request, Response } from "express";
import { DatabaseError } from "pg";
import { apiRouter } from "./routes/api-router";
import {
  customError,
  databaseError,
  notFound,
  serverError,
} from "./error-handlers";

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.all("/{*any}", notFound);

app.use(databaseError);

app.use(customError);

app.use(serverError);

export default app;
