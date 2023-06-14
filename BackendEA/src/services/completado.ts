//In charge to connect with the dB
import { Asignacion } from "../interfaces/asignacion.interface";
import { Producto } from "../interfaces/producto.interface";
import AsignacionModel from "../models/asignacion";
import UserModel from "../models/user";
import ProductoModel from "../models/producto";
import { Types } from "mongoose";
import { Completado } from "../interfaces/completado.interface";
import CompletadoModel from "../models/completado";


const createCompletado = async(item: Completado) => {
    const responseInsert = await CompletadoModel.create(item);
    return responseInsert;
};

const updateCompletado = async(id: string, data: Asignacion) => {
    const responseItem = await CompletadoModel.findOneAndUpdate({_id: id}, data,{new: true});
    return responseItem;
};

// const updateAsignacion = async(idProducto: string, idAsignacion: string) => {
//     const responseInsert = await AsignacionModel.findOneAndUpdate({_id: idAsignacion}, 
//     {$addToSet: {producto: new Types.ObjectId(idProducto)}},
//     {new: true}).populate('productos');
//     return responseInsert;
// };


const deleteCompletado = async(id: string) => {
    const responseItem = await CompletadoModel.findOneAndRemove({_id: id});
    return responseItem;
}



export {createCompletado, deleteCompletado,updateCompletado};
