import { ObjectId } from "mongoose";

export interface Grupo {
    name: string;
    codigo?: string;
    users?: ObjectId[];
    tickets?: ObjectId[];
    descripcion?: string;
}