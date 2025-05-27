import express, { NextFunction, Request, Response } from 'express'
import usersRouter from "./routes/users"

const app = express()

app.use('/api/users', usersRouter)

export default app