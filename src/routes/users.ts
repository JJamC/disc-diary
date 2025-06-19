import { Router } from "express"
import { postUser, getUsers, patchUser } from "../controllers/users"

const router = Router()

// /api/users
router.get('/', getUsers)

router.post('/', postUser)

router.patch('/:user_id', patchUser)

export default router