import { Router } from "express"
import { getUsers } from "../controllers/users"

const router = Router()

// /api/users
router.get('/', getUsers)

export default router