import { ObjectId } from "mongoose";

export interface Asignacion {
    usuario: ObjectId;
    cantidad: number;
}