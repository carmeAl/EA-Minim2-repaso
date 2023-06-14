import { Request,Response } from "express";
import { getTicketsOfUser,insertUser,getUsers,getUser,updateUser,deleteUser, getUsersPaginado, disableUser,getGruposOfUser} from "../services/user";
import { handleHttp } from "../utils/error.handle";
import {registerNewUser,loginUser, registerNewUserGoogle}from "../services/auth";
import {User} from "../interfaces/user.interface";


const getPerson=async({params}:Request,res:Response)=>{
    try{
        const {idUser}=params;
        const response=await getUser(idUser);
        const data=response ? response:"NOT_FOUND";
        res.send(data);
    } catch(e){
        handleHttp(res,"ERROR_GET_USER");
    }
};

const getPeople=async(req:Request,res:Response)=>{
    try{
        const response=await getUsers();
        res.send(response);
    } catch(e){
        handleHttp(res,"ERROR_GET_USERS");
    }
};

const getPeoplePaginado=async({params}:Request,res:Response)=>{
    try{
        const {limite1, pagina1}=params;
        let pagina = +pagina1
        let limite = +limite1
        const response=await getUsersPaginado(limite, pagina);
        res.send(response);
    } catch(e){
        handleHttp(res,"ERROR_GET_USERS");
    }
};

const updatePerson=async ({params,body}:Request,res:Response)=>{
    try{
        const {idUser}=params;
        const response=await updateUser(idUser,body);
        res.send(response);
    } catch(e){
        handleHttp(res,"ERROR_UPDATE_USER");
    }
};

const postPerson=async ({body}:Request,res:Response)=>{
    try{
        const responsePerson=await insertUser(body);
        res.send(responsePerson);
    }catch(e){
        handleHttp(res,"ERROR_POST_USER");
    }
};

const deletePerson=async ({params}:Request,res:Response)=>{
    try{
        const {idUser}=params;
        const response=await deleteUser(idUser);
        res.send(response);
    } catch(e){
        handleHttp(res,"ERROR_DELETE_USER");
    }
};

const disablePerson=async ({params}:Request,res:Response)=>{
    try{
        const {idUser}=params;
        const response=await disableUser(idUser);
        res.send(response);
    } catch(e){
        handleHttp(res,"ERROR_DISABLE_USER");
    }
};

const gruposOfUser=async({params}:Request,res:Response)=>{
    try{
        const {idUser}=params;
        const response=await getGruposOfUser(idUser);
        const data=response ? response:"NOT_FOUND";
        res.send(data);
    } catch(e){
        handleHttp(res,"ERROR_GET_GRUPOS_OF_USER");
    }
};

const ticketsOfUser=async({params}:Request,res:Response)=>{
    try{
        const {idUser}=params;
        const response=await getTicketsOfUser(idUser);
        const data=response ? response:"NOT_FOUND";
        res.send(data);
    } catch(e){
        handleHttp(res,"ERROR_GET_TICKETS_OF_USER");
    }

    
};
const registerCtrl=async ({body}:Request,res:Response)=>{
    try{
        var _user: User= body;
        const response=await registerNewUser(_user);
        if(response==="INVALID_EMAIL"){
            res.status(210);
            res.send(response);
        } else if(response==="BLANK_PASSWORD"){
            res.status(211);
            res.send(response);
        }
        else if(response==="ALREADY_USER"){
            res.status(212);
            res.send(response);
        }
        else{
            res.send(response);
        }

    } catch(e){
        handleHttp(res,"ERROR_REGISTER_USER"+e);
    }
};
const registerCtrlGoogle=async ({body}:Request,res:Response)=>{
    try{
        var _user: User= body;
        const response=await registerNewUserGoogle(_user);
        if(response==="INVALID_EMAIL"){
            res.status(210);
            res.send(response);
        } else if(response==="BLANK_PASSWORD"){
            res.status(211);
            res.send(response);
        }
        else{
            res.send(response);
        }

    } catch(e){
        handleHttp(res,"ERROR_REGISTER_USER"+e);
    }
};
const loginCtrl=async ({body}:Request,res:Response)=>{
    try{
        const {email,password}=body;
        const responseUser=await loginUser(email, password);
        if(responseUser==="PASSWORD_INCORRECT"){
            res.status(202);
            res.send(responseUser);
        } else if(responseUser==="NOT_FOUND_USER"){
            res.status(201);
            res.send(responseUser);
        }
        else{
            res.send(responseUser);
        }

    }catch(e){
    handleHttp(res,"ERROR_LOGIN_USER");
    }
};

export{loginCtrl,registerCtrl,getPerson,getPeople,postPerson,updatePerson,deletePerson,getPeoplePaginado, disablePerson,gruposOfUser,ticketsOfUser, registerCtrlGoogle};