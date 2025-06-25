import express, { NextFunction, Request, Response } from 'express'
import usersRouter from "./routes/users"
import albumsRouter from "./routes/albums"
import { DatabaseError } from 'pg'

interface CustomError {
    status: number,
    msg: string
}

const app = express()

app.use(express.json())

app.use('/api/users', usersRouter)

app.use('/api/albums', albumsRouter)

app.all('/{*any}', (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({ msg: "Not Found"})
})

app.use((err: DatabaseError, req: Request, res: Response, next: NextFunction) => {
    if (err.code === "22P02") res.status(400).send({ msg: "Bad Request" })
    next(err)
})

app.use(
  (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (err.status && err.msg) {
      res.status(err.status).send({ msg: err.msg });
    }
    next(err);
  }
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).send({ msg: "Bad Request"})
})



export default app