import {  Schema, Types, model, Model } from "mongoose";
import { Producto } from "../interfaces/producto.interface";

const ProductoSchema = new Schema<Producto>(
    {
        name:{
            type: String,
            required:true,
        },
        quantity:{
            type: Number,
            required: true,
        },
        totalprice:{
            type: Number,
            required: false,
        },
        asignaciones:{
            type: [Schema.Types.ObjectId],
            ref:'Asignaciones',
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const ProductoModel = model('productos', ProductoSchema);

export default ProductoModel;