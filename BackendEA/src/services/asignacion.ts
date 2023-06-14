//In charge to connect with the dB
import { Asignacion } from "../interfaces/asignacion.interface";
import { Producto } from "../interfaces/producto.interface";
import AsignacionModel from "../models/asignacion";
import UserModel from "../models/user";
import ProductoModel from "../models/producto";
import { Types } from "mongoose";


const createAsignacion = async(item: Asignacion) => {
    const responseInsert = await AsignacionModel.create(item);
    return responseInsert;
};

const updateAsignacion = async(id: string, data: Asignacion) => {
    const responseItem = await AsignacionModel.findOneAndUpdate({_id: id}, data,{new: true});
    return responseItem;
};

// const updateAsignacion = async(idProducto: string, idAsignacion: string) => {
//     const responseInsert = await AsignacionModel.findOneAndUpdate({_id: idAsignacion}, 
//     {$addToSet: {producto: new Types.ObjectId(idProducto)}},
//     {new: true}).populate('productos');
//     return responseInsert;
// };


const deleteAsignacion = async(id: string) => {
    const responseItem = await AsignacionModel.findOneAndRemove({_id: id});
    return responseItem;
}

const getAsignacionesUser = async(idUser: string) => {

    const user = await UserModel.findById(idUser);
    if (!user) {
      throw new Error("User not found");
    }
    const asignaciones = await AsignacionModel.find({ usuario: idUser });
    return asignaciones;
}

const PrecioPendientePagoTicket = async(idUser: string, idTicket: string) => {
    
    const asignaciones = await AsignacionModel.find({ user: idUser, ticket: idTicket });
    // const dinero = await ProductoModel.find({producto: asignaciones.producto})

}



export {createAsignacion, deleteAsignacion,updateAsignacion};
