//Error Manager
import { Response } from "express";

const handleHttp = (res: Response, error: string, errorRaw?: any) => {
    console.log(error);
    res.status(500);
    res.send({error});
};

const notFoudError= (res: Response, error: string, errorRaw?: any) => {
    console.log(error);
    res.status(201);
    res.send({error});
};


export {handleHttp,notFoudError};
