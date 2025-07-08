import { Router } from "express"

import { getPosts } from "../controllers/posts"

const router = Router()

router.get('/', getPosts)



export default router