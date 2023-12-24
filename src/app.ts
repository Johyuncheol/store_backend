import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import authRouter from "../src/routes/auth";
import detailRouter from "../src/routes/detail";
import mainRouter from "../src/routes/main";
import shoppingBagRouter from "../src/routes/shoppingBag";
import categoryRouter from "../src/routes/category";
import searchRouter from '../src/routes/search'

const app: Application = express();
const cors = require("cors");

const port: number = 4000;

app.use(
  cors({
    origin: "http://localhost:3000", // Adjust this to the actual origin of your client
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});

///////////////////////////////////
// 라우터

app.use("/api/auth", authRouter);
app.use("/api/detail", detailRouter);
app.use("/api/main", mainRouter);
app.use("/api/shoppingBag", shoppingBagRouter);
app.use("/api/category", categoryRouter);
app.use("/api/search", searchRouter);

/////////////////////////////////////




