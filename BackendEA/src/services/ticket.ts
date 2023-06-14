//In charge to connect with the dB
import { Grupo } from "../interfaces/grupo.interface";
import { Types } from "mongoose";
import { User } from "../interfaces/user.interface";
import GrupoModel from "../models/grupo";
import UserModel from "../models/user";
import { Ticket } from "../interfaces/ticket.interface";
import TicketModel from "../models/ticket";
import { Completado } from "../interfaces/completado.interface";
import CompletadoModel from "../models/completado";

const insertTicket = async (item: Ticket) => {
    const responseInsert = await TicketModel.create(item);
    return responseInsert;
};

const getTickets = async () => {
    const responseItem = await TicketModel.find({});
    return responseItem;
};

const getTicketsPaginado = async (pagina: number) => {
    const page = pagina; // Número de página actual
    const limit = 10; // Número de documentos a devolver por página
    const skip = (page - 1) * limit; // Número de documentos para saltar
    const responseItem = await TicketModel.find({}).skip(skip).limit(limit)
    return responseItem;
};


const getTicket = async (id: string) => {
    const responseItem = await TicketModel.findOne({ _id: id });
    return responseItem;
};

const updateTicket = async (id: string, data: Ticket) => {
    const responseItem = await TicketModel.findOneAndUpdate({ _id: id }, data, { new: true });
    return responseItem;
};


const deleteTicket = async (id: string) => {
    const responseItem = await TicketModel.findOneAndRemove({ _id: id });
    return responseItem;
}

const insertProductoToTicket = async (idTicket: string, idProducto: string) => {
    console.log(idTicket);
    console.log(idProducto);
    const responseItem = await TicketModel.findOneAndUpdate({ _id: idTicket },
        { $addToSet: { productos: new Types.ObjectId(idProducto) } },
        { new: true }).populate('productos');
    return responseItem;
}

const getProductosTicket = async (id: string) => {
    const responseItem = await TicketModel.findOne({ _id: id }).populate('productos').then(ticket => ticket?.productos);
    return responseItem;
};

// const deleteProductoToTicket = async(idTicket: string, idProducto: string) => {
//     const responseItem = await GrupoModel.findOneAndUpdate({_id:idTicket},
//         {$addToSet: {producto: new Types.ObjectId(idProducto)}},
//         {new: true}).populate('productos');
// }

const putCompletadoToTicket = async (idTicket: string, data: Completado) => {

    const ticketBBDD = await TicketModel.findOne({ _id: idTicket });
    if (ticketBBDD != undefined) {
        var i: number = 0;
        var encontrado: boolean = false;
        var completado;
        while (i < ticketBBDD.completado.length && !encontrado) {
            completado = await CompletadoModel.findOne({_id:  ticketBBDD.completado[i] });
            if (completado != undefined) {
                encontrado = true;
            }
            i++;
        }
        if (encontrado && completado?.usuario == data.usuario) {
            const responseItem = await CompletadoModel.findOneAndUpdate({ _id: completado?.id }, data, { new: true });
            return responseItem;
        }
        if(!encontrado) {
            const responseInsert = await CompletadoModel.create(data);
            const responseItem = await TicketModel.findOneAndUpdate({ _id: idTicket },
                { $addToSet: { completado: new Types.ObjectId(responseInsert._id) } },
                { new: true }).populate('completado');
            return responseItem;
        }



    }
};




export { getProductosTicket, insertTicket, getTickets, getTicket, deleteTicket, insertProductoToTicket, updateTicket, getTicketsPaginado, putCompletadoToTicket };
