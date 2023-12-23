import express, { Request, Response } from "express";

const mainData = require("../json/main");

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  return res.status(201).send({
    data: mainData,
    status: "Success to get main",
  });
});

export default router;
