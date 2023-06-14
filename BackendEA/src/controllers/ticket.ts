import { Request, Response } from "express";
import { insertUser, getUsers, getUser, updateUser, deleteUser } from "../services/user";
import { handleHttp } from "../utils/error.handle";
import { deleteGrupo, getGrupo, getGrupos, insertGrupo, insertTicketGrupo, joinGrupo, updateGrupo } from "../services/grupo";
import { putCompletadoToTicket, getProductosTicket, deleteTicket, getTicket, getTickets, getTicketsPaginado, insertProductoToTicket, insertTicket, updateTicket } from "../services/ticket";
import { insertProducto } from "../services/producto";
import TicketModel from "../models/ticket";
import { Completado } from "../interfaces/completado.interface";

const get_Ticket = async ({ params }: Request, res: Response) => {
    try {
        const { idTicket } = params;
        const response = await getTicket(idTicket);
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    } catch (e) {
        handleHttp(res, "ERROR_GET_TICKET");
    }
};


const get_TicketsPaginado = async ({ params }: Request, res: Response) => {
    try {
        const { pagina1 } = params;
        let pagina = +pagina1
        const response = await getTicketsPaginado(pagina);
        res.send(response);
    } catch (e) {
        handleHttp(res, "ERROR_GET_TICKETS");
    }
};


const get_Tickets = async (req: Request, res: Response) => {
    try {
        const response = await getTickets();
        res.send(response);
    } catch (e) {
        handleHttp(res, "ERROR_GET_TICKETS");
    }
};


const create_Ticket = async ({ body }: Request, res: Response) => {
    try {
        var ticket = {
            "nombre": body.nombre,
            "isEnabled":true,
            "location": body.location,
            "anfitrion": body.userId,
            "completado": body.completado
        };

        const responseTicket = await insertTicket(ticket);
        const responseTicketGrupo = await insertTicketGrupo(body.grupoId, responseTicket.id);
        res.send(responseTicketGrupo);
    } catch (e) {
        handleHttp(res, "ERROR_CREATE_TICKET");
    }
};

const create_Ticket_and_insertToGrupo = async ({ body }: Request, res: Response) => {
    try {
        const responsePerson = await insertTicket(body);
        res.send(responsePerson);
    } catch (e) {
        handleHttp(res, "ERROR_CREATE_TICKET");
    }
};


const delete_Ticket = async ({ params }: Request, res: Response) => {
    try {
        const { idTicket } = params;
        const response = await deleteTicket(idTicket);
        res.send(response);
    } catch (e) {
        handleHttp(res, "ERROR_DELETE_TICKET");
    }
};

const update_Ticket = async ({ params, body }: Request, res: Response) => {
    try {
        const { idTicket } = params;
        const response = await updateTicket(idTicket, body);
        res.send(response);
    } catch (e) {
        handleHttp(res, "ERROR_UPDATE_USER");
    }
};

const insert_ProductoToTicket = async ({ body }: Request, res: Response) => {
    try {
        const { idProducto, idTicket } = body;
        const response = await insertProductoToTicket(idTicket, idProducto);
        res.send(response);
    } catch (e) {
        handleHttp(res, "ERROR_INSERT_INTO_TICKET");
    }
};

const get_productos_ticket = async ({ params }: Request, res: Response) => {
    try {
        const { idTicket } = params;
        const response = await getProductosTicket(idTicket);
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    } catch (e) {
        handleHttp(res, "ERROR_GET_PRODUCTOS_TICKET");
    }
};


const putCompletadoTo_Ticket = async (body: Request, res: Response) => {
    try {
        var idUsuario = body.body.idUsuario;
        var response;
        for (var i = 0; i < body.body.completados.length; i++) {
            var completado: Completado = {
                "usuario": idUsuario,
                "completado": body.body.completados[i].completado,
            };
            response = await putCompletadoToTicket(body.body.completados[i].idTicket, completado);

        }
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    } catch (e) {
        handleHttp(res, "ERROR_COMPLETADO_TICKET");
    }
};


export { get_productos_ticket, get_Ticket, get_Tickets, create_Ticket, delete_Ticket, insert_ProductoToTicket, update_Ticket, get_TicketsPaginado, putCompletadoTo_Ticket };