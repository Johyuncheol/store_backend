import express, { Request, Response } from 'express';
const fs = require("fs");
const path = require("path");

const userData = require("../json/user");

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
    const userId: string = req.body.id;
    const userPW: string = req.body.password;
  
    const user = userData.find((item: any) => item.id === userId);
    if (user) {
      if (user.password === userPW) {
        const resdata = { name: user.name };
  
          res.cookie('accessToken', 'access',{ secure: true, httpOnly: true});
          res.cookie('refreshToken', 'refresh', { secure: true, httpOnly: true});
  
        return res.status(201).send({
          data: resdata,
          status: "Success Login",
        });
      } else {
        return res.status(202).send({
          data: null,
          status: "비밀번호가 일치하지 않습니다",
        });
      }
    } else {
      return res.status(404).send({
        data: null,
        status: "존재하지 않는 유저입니다",
      });
    }
  });
  
  
  router.post('/isLogin', (req: Request, res: Response) => {
    const cookies = req.cookies;
  
    // If the refresh token is different or missing
    if (cookies.refreshToken !== 'refresh') {
      return res.status(204).send({ status: 'Need Login' });
    }
  
    // If the access token is different or missing
    else if (cookies.accessToken !== 'access') {
      // Validate the existing access token signature here
  
      const resdata = { name: 'nickName' };
      res.cookie('accessToken', 'access', { secure: true }); // Set a new access token
      return res.status(205).json({
        data: resdata,
        status: 'Change accessToken',
      });
    }
  
    // When everything is fine
    else {
      const resdata = { name: 'nickName' };
      return res.status(201).json({
        data: resdata,
        status: 'Logined User',
      });
    }
  });
  
  
  router.post('/logout', (req: Request, res: Response) => {
    res.cookie('accessToken', 'access', {
      expires: new Date('1997-04-22T00:00:00Z'), // 유효기간을 지난날짜로 설정 (토큰삭제)
      secure: true,
    });
  
    res.cookie('refreshToken', 'refresh', {
      expires: new Date('1997-04-22T00:00:00Z'), // 유효기간을 지난날짜로 설정
      secure: true,
    });
  
    res.status(201).json({
      message: 'Success to logout',
    });
  });


  router.post("/register", async (req: Request, res: Response) => {
    const userId = req.body.id;
    const userPW = req.body.password;
    const userNickName = req.body.nickName;
  
    const newUser = {
      id: userId,
      password: userPW,
      name: userNickName,
    };
  
    console.log(newUser);
    userData.push(newUser);
  
    const filePath = path.join(__dirname, "../json/user.json");
    fs.writeFileSync(filePath, JSON.stringify(userData));
  
    return res.status(201).send({
      data: null,
      status: "Success to get register",
    });
  });


export default router;