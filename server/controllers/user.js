import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";


export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
