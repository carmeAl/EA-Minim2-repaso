import { NextFunction, Request,Response } from "express";
import { verifyToken } from "../utils/jwt.handle";
import {JwtPayload} from "jsonwebtoken";

interface RequestExt extends Request{
    userRole?:string | JwtPayload;
}

const checkJwt=(req:RequestExt,res:Response,next:NextFunction)=>{
    try{
        const jwtByUser=req.headers.authorization || null || '';
        const jwt=jwtByUser.split(' ').pop() //jwtByUser = Bearer codigoToken  --> jwt=codigoToken
        const isOk=verifyToken(`${jwt}`);
        req.userRole=isOk;
        console.log({jwtByUser});
        next();
    }catch(e){
        res.status(400);
        res.send("SESSION_NO_VALIDA");
    }
};
export{checkJwt};