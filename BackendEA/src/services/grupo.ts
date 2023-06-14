//In charge to connect with the dB
import { Grupo } from "../interfaces/grupo.interface";
import { Schema, Types } from "mongoose";
import { User } from "../interfaces/user.interface";
import GrupoModel from "../models/grupo";
import UserModel from "../models/user";
import AsignacionModel from "../models/asignacion";
import { Completado } from "../interfaces/completado.interface";
import CompletadoModel from "../models/completado";
import TicketModel from "../models/ticket";
import { Ticket } from "../interfaces/ticket.interface";
import { createCompletado } from "./completado";
import { putCompletadoToTicket } from "./ticket";


const insertGrupo = async (item: Grupo) => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigo: string;
    do {
        codigo = '';
        for (let i = 0; i < 6; i++) {
            codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        item.codigo = codigo;
    } while (await GrupoModel.exists({ codigo: codigo }));

    if (item.name.trim() === "") {
        return "NOMBRE_VACIO";
    }

    const responseInsert = await GrupoModel.create(item);
    return responseInsert;
};

const getGrupoCodigo = async (id: string) => {
    const grupo1 = await GrupoModel.findOne({ _id: id });
    const responseItem = grupo1?.codigo;
    return responseItem;
};

const getAllGrupoCodigos = async () => {
    const grupos = await GrupoModel.find({});
    const codigos = grupos.map(grupo => grupo.codigo);
    return codigos;
};

const getGrupos = async () => {
    const responseItem = await GrupoModel.find({});
    return responseItem;
};

const getGrupo = async (id: string) => {
    const responseItem = await GrupoModel.findOne({ _id: id });
    return responseItem;
};

const updateGrupo = async (id: string, data: Grupo) => {
    const responseItem = await GrupoModel.findOneAndUpdate({ _id: id }, data, { new: true });
    return responseItem;
};

const deleteGrupo = async (id: string) => {
    const responseItem = await GrupoModel.findOneAndRemove({ _id: id });
    return responseItem;
}

const joinGrupo = async (UserId: string, codigo: string) => {
    const GrupoSeleccionado = await GrupoModel.findOne({ codigo: codigo });
    console.log(GrupoSeleccionado);
    if (!GrupoSeleccionado) {
        return null;
    }
    const PasswordGrupo = GrupoSeleccionado?.codigo;
    if (PasswordGrupo === codigo) {
        await crearCompletadosJoinGrupo(GrupoSeleccionado, UserId);
        const responseItem = await GrupoModel.findOneAndUpdate({ codigo: codigo },
            { $addToSet: { users: new Types.ObjectId(UserId) } },
            { new: true }).populate('users');
        return responseItem;
    }
    else {
        console.log('Error: codigo incorrecta')
    }

}
const crearCompletadosJoinGrupo = async (grupo: Grupo, idUser: string) => {
    try {
        var mongoose = require('mongoose');
        //Buscamos todos los completados que tiene el usuario
        const completadosUser: Array<Completado> | null | undefined = await CompletadoModel.findOne({ usuario: idUser });
        //Buscamos si el ticket tiene algun completado del usuario
        //Recorremos la lista de los completados del usuario
        if (completadosUser != null || completadosUser != undefined) {
            //Por cada completado de usuario miramos si esta dentro de algun ticket del grupo
            completadosUser.forEach(completadoUser => {
                if (grupo.tickets != null || grupo.tickets != undefined) {
                    //Recorremos los tickets en busca del completado del usuario
                    grupo.tickets.forEach(async ticket => {
                        const ticketFind: Ticket | null | undefined = await TicketModel.findOne({ completado: completadoUser, _id: ticket });
                        //Si no existe ningun Completado lo creeamos
                        if (ticketFind == null || ticketFind == undefined) {
                            //Cremaos completado
                            var completadoCreado = await createCompletado({
                                "usuario": mongoose.Types.ObjectId(idUser),
                                "completado": false
                            })
                            //Lo añadimos al ticket
                            await putCompletadoToTicket(ticket.toString(), completadoCreado);

                        }

                    });
                }

            });
        }//Si no el usuario no tiene ningun completado los creamos
        else {
            if (grupo.tickets != null || grupo.tickets != undefined) {
                //Recorremos los tickets en busca del completado del usuario
                grupo.tickets.forEach(async ticket => {

                    //Cremaos completado
                    var completadoCreado = {
                        "usuario": new mongoose.Types.ObjectId(idUser),
                        "completado": false
                    };
                    //Lo añadimos al ticket
                    await putCompletadoToTicket(ticket.toString(), completadoCreado);
                });
            }
        }

    } catch (e) {
        console.log(e);
    }
}

const insertTicketGrupo = async (idGrupo: string, idTicket: string) => {
    const quebuscas = await GrupoModel.findOne({ _id: idGrupo })
    const responseItem = await GrupoModel.findOneAndUpdate(
        { _id: idGrupo },
        { $addToSet: { tickets: new Types.ObjectId(idTicket) } },
        { new: true }
    )
    if (responseItem != null) {
        crearCompletadosInsertTicketGrupo(responseItem, idTicket);
    }
    return responseItem;

}
const crearCompletadosInsertTicketGrupo = async (grupo: Grupo, idTicket: string) => {
    if (grupo.users != null || grupo.users != undefined) {
        grupo.users.forEach(user => {
            putCompletadoToTicket(idTicket, {
                "usuario": user,
                "completado": false
            });
        });
    }

}

const exitGrupo = async (UserName: string, GrupoName: string) => {
    const responseItem = await GrupoModel.findOneAndUpdate({ _id: GrupoName },
        { $pull: { users: new Types.ObjectId(UserName) } },
        { new: true }
    );
    console.log(responseItem?.users);
    return responseItem;
}

const populateGrupo = async (id: string) => {
    const responseItem = await GrupoModel.findOne({ _id: id }).populate({ path: 'tickets', populate: { path: 'productos', populate: { path: 'asignaciones' } } }).populate('users').populate({ path: 'tickets', populate: { path: 'completado' } });
    return responseItem;

}





export { insertGrupo, getGrupos, getGrupo, updateGrupo, deleteGrupo, joinGrupo, insertTicketGrupo, exitGrupo, populateGrupo, getGrupoCodigo, getAllGrupoCodigos };
