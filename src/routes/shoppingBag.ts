import express, { Request, Response } from "express";

const shoppingBagData = require("../json/shoppingBag");

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  return res.status(201).send({
    data: shoppingBagData,
    status: "Success to get main",
  });
});

router.post("/", (req: Request, res: Response) => {
  return res.status(201).send({
    data: shoppingBagData,
    status: "Success to get main",
  });
});
export default router;
