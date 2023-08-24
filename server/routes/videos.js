import express from "express";
import { addVideo, getVideo, random, search, getLinkedVideo } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//create a video
router.post("/", verifyToken, addVideo)
router.get("/find/:id", getVideo)
router.get("/random", verifyToken, random)
router.get("/search", verifyToken, search)
router.get("/:id", verifyToken, getLinkedVideo)

export default router;
