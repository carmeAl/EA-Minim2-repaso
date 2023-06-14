import {  Schema, Types, model, Model } from "mongoose";
import { Completado } from "../interfaces/completado.interface";

const CompletadosSchema = new Schema<Completado>(
    {
        usuario:{
            type: Schema.Types.ObjectId,
            ref:'users',
        },
        completado:{
            type: Boolean,
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const CompletadoModel = model('completado', CompletadosSchema);

export default CompletadoModel;