import { Request,Response } from "express";
import { insertUser,getUsers,getUser,updateUser,deleteUser} from "../services/user";
import { handleHttp } from "../utils/error.handle";
import { deleteGrupo, getGrupo, getGrupos, insertGrupo, joinGrupo, updateGrupo } from "../services/grupo";
import { createAsignacion, deleteAsignacion } from "../services/asignacion";
import { getProducto } from "../services/producto";
import { getTicket } from "../services/ticket";

const create_Asignacion=async({body}:Request,res:Response)=>{
    try{
        const {user, producto, ticket }=body;
        const idproducto = await getProducto(producto);
        if (!producto) {
        return res.status(404).send("Producto no encontrado");
        }
        const idticket = await getTicket(ticket);
        if (!ticket) {
        return res.status(404).send("Ticket no encontrado");
        }
    } catch(e){
        handleHttp(res,"ERROR_INSERT_ASIGNACION");
    }
};


const delete_Asignacion=async ({params}:Request,res:Response)=>{
    try{
        const {idAsignacion}=params;
        const response=await deleteAsignacion(idAsignacion);
        res.send(response);
    } catch(e){
        handleHttp(res,"ERROR_DELETE_GRUPO");
    }
};



// const update_Asignacion=async ({params,body}:Request,res:Response)=>{
//     try{
//         const {idAsignacion}=params;
//         const response=await updateAsignacion(idAsignacion, body);
//         res.send(response);
//     } catch(e){
//         handleHttp(res,"ERROR_UPDATE_ASIGNACION");
//     }
// };



export{create_Asignacion,  delete_Asignacion};