import { Router } from "express"
import { createUser, getUsers } from "../controllers/users"

const router = Router()

// /api/users
router.get('/', getUsers)

router.post('/', createUser)

export default router