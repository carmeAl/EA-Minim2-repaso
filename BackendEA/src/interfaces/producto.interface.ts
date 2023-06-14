import { ObjectExpression, ObjectId } from "mongoose";

export interface Producto {
    name: string;
    quantity: number;
    totalprice: number;
    asignaciones: ObjectId[];
}