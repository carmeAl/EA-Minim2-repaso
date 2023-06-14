import { ObjectId } from "mongoose";

export interface Completado {
    usuario: ObjectId;
    completado: boolean;
}