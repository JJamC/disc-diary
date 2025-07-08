import { Router } from "express"
import { postUser, getUsers, patchUserUsername, removeUser, getUser, getPostsByUser, makePostByUser } from "../controllers/users"

const router = Router()

// /api/users
router.get('/', getUsers)

router.get("/:user_id", getUser);

router.get("/:user_id/posts", getPostsByUser)

router.post('/', postUser)

router.post("/:user_id/posts", makePostByUser);

router.patch('/:user_id', patchUserUsername)

router.delete('/:user_id', removeUser)

export default router