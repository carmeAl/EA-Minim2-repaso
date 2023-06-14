//In charge to connect with the dB
import { User } from "../interfaces/user.interface";
import UserModel from "../models/user";
import GrupoModel from "../models/grupo";
import TicketModel from "../models/ticket";
import { Types } from "mongoose";


const insertUser = async(item: User) => {
    const itemWithIsEnabled = { ...item, isEnabled: true };
    const responseInsert = await UserModel.create(itemWithIsEnabled);
    return responseInsert;
};

const getUsers = async() => {
    const responseItem = await UserModel.find({isEnabled: true});
    return responseItem;
};


const getUsersPaginado = async(limite: number,pagina: number) => {
    const page = pagina; // Número de página actual
    const limit = limite; // Número de documentos a devolver por página
    const skip = (page - 1) * limit; // Número de documentos para saltar
    const responseItem = await UserModel.find({}).skip(skip).limit(limit)
    return responseItem;
};



const getUser = async(id: string) => {
    const responseItem = await UserModel.findOne({_id: id});
    return responseItem;
};

const updateUser = async(id: string, data: User) => {
    const responseItem = await UserModel.findOneAndUpdate({_id: id}, data,{new: true});
    return responseItem;
};

const deleteUser = async(id: string) => {
    const responseItem = await UserModel.findOneAndRemove({_id: id});
    return responseItem;
}

const disableUser = async(id: string) => {
    const responseItem = await UserModel.findOneAndUpdate({_id: id},{ $set: { isEnabled: false } });
    return responseItem;
}

const getGruposOfUser = async(id: string) => {
    const responseItem = await GrupoModel.find({"users": new Types.ObjectId(id)});
    return responseItem;
};
const getTicketsOfUser = async(id: string) => {
    const responseItem = await GrupoModel.find({"users": new Types.ObjectId(id)}).populate('tickets');
    const tickets=responseItem.map(grupo=>grupo.tickets);
    return tickets;
};



export {insertUser, getUser, getUsers, updateUser, deleteUser, getUsersPaginado, disableUser,getGruposOfUser,getTicketsOfUser};
