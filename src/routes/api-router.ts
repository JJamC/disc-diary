import express from "express";
import usersRouter from "./users";
import albumsRouter from "./albums";
import postsRouter from "./posts";
import commentsRouter from "./comments";

export const apiRouter = express.Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/albums", albumsRouter);
apiRouter.use("/posts", postsRouter);
apiRouter.use("/comments", commentsRouter);
