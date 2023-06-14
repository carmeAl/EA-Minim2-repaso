import {  Schema, Types, model, Model } from "mongoose";
import { Asignacion } from "../interfaces/asignacion.interface";

const SubjectSchema = new Schema<Asignacion>(
    {
        usuario:{
            type: Schema.Types.ObjectId,
            ref:'users',
        },
        cantidad:{
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const AsignacionModel = model('Asignaciones', SubjectSchema);

export default AsignacionModel;