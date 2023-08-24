import express from "express";
import {
  getUser
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//get a user
router.get("/find/:id", getUser);


export default router;
