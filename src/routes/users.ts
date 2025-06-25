import { Router } from "express"
import { postUser, getUsers, patchUserUsername, removeUser, getUser } from "../controllers/users"

const router = Router()

// /api/users
router.get('/', getUsers)

router.get("/:user_id", getUser);

router.post('/', postUser)

router.patch('/:user_id', patchUserUsername)

router.delete('/:user_id', removeUser)

export default router