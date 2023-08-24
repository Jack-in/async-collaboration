import express from "express";
import {addLink, getLink, getResponses} from "../controllers/link.js"
import {verifyToken} from "../verifyToken.js"

const router = express.Router();
router.post("/", verifyToken, addLink)
router.get("/", verifyToken, getResponses)
router.get("/:id", getLink)
export default router;