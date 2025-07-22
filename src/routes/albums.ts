import { Router } from "express";

import { getAlbums, postAlbum, getAlbum } from "../controllers/albums";
import { getTracks } from "../controllers/tracks";

const router = Router();

router.get("/", getAlbums);
router.get("/:album_id", getAlbum);
router.get("/:album_id/tracks", getTracks);
router.post("/", postAlbum);

export default router;
