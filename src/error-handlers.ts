import express, { NextFunction, Request, Response } from "express";
import { DatabaseError } from "pg";

interface CustomError {
  status: number;
  msg: string;
}

export const notFound = (req: Request, res: Response, next: NextFunction) => {  
  res.status(404).send({ msg: "Not Found" });
};

export const databaseError = (
  err: DatabaseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.code === "22P02" || err.code === "23502") res.status(400).send({ msg: "Bad Request" });
  next(err);
};

export const customError = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
  next(err);
};

export const serverError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).send({ msg: "Server Error" });
};
