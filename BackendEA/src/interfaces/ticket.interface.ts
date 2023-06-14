import { ObjectExpression, ObjectId } from "mongoose";

export interface Ticket {
    nombre: string;
    productos?: ObjectId[];
    location?: string; 
    anfitrion?: ObjectId;
    completado: ObjectId[];
    isEnabled?: boolean;
}