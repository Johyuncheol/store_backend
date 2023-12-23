import express, { Request, Response } from "express";

const womenData = require("../json/women");
const manData = require("../json/man");
const interiorData = require("../json/interior");

const router = express.Router();

router.get("/:category/:detail", (req: Request, res: Response) => {
    const url = new URL(req.url!, `http://${req.headers.host}`);
    const page = Number(url.searchParams.get("page"));
  
    interface WomenData {
      all: Item[];
      outer: Item[];
      top: Item[];
      bottom: Item[];
    }
  
    interface Item {
      id: number;
      imgSrc: string;
      brand: string;
      name: string;
      price: number;
      deliveryFee: number;
      noDeliveryPrice: number;
    }
  
    interface ResponseData {
      data: Item[];
      totalNums: number;
    }
  
    const category = req.params.category as string;
    const detail = req.params.detail as keyof WomenData;
  
    let data: Item[] = [];
  
    if (category === "women") {
      data = womenData[detail] || [];
    } else if (category === "man") {
      data = manData[detail] || [];
    } else if (category === "interior") {
      data = interiorData[detail] || [];
    }
  
    console.log(data.length);
    if (page === 1) {
      const findData = data.slice(0, page * 20);
      const sendData: ResponseData = {
        data: findData,
        totalNums: data.length,
      };
  
      return res.status(201).json(sendData);
    } else {
      const findData = data.slice((page - 1) * 20, page * 20);
      const sendData: ResponseData = {
        data: findData,
        totalNums: data.length,
      };
  
      return res.status(202).json(sendData);
    }
  });
  

export default router;
