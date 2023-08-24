import { response } from "express";
import Link from "../models/Link.js";

export const addLink = async (req, res, next) => {
  const newLink = new Link({ userId: req.user.id, ...req.body });
  try {
    const savedLink = await newLink.save();
     res.status(200).json(savedLink);
  } catch (err) {
    next(err);
  }
};
export const getLink = async (req, res, next) => {
  try {
    const link = await Link.findById(req.params.id);
    res.status(200).json(link);
  } catch (err) {
    next(err);
  }
};
export const getResponses = async (req, res, next) => {
  try {
    const responses = await Link.find({ userId:req.user.id}).sort({ createdAt: -1 });
    res.status(200).json(responses);
  } catch (err) {
    next(err);
  }
};