import { Router } from "express"

import { getPosts, updatePost } from "../controllers/posts"

const router = Router()

router.get('/', getPosts)
router.patch('/:post_id', updatePost)


export default router