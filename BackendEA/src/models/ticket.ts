import {  Schema, Types, model, Model } from "mongoose";
import { Ticket } from "../interfaces/ticket.interface";

const TicketSchema = new Schema<Ticket>(
    {
        nombre:{
            type: String,
            required: false,
        },

        productos:{
            type: [Schema.Types.ObjectId],
            ref:'productos',
        },

        location:{
            type: String,
            required: false,
        },

        anfitrion:{
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: false,
        },
        completado:{
            type: [Schema.Types.ObjectId],
            ref:'completado',
        },
        isEnabled:{
            type: Boolean,

        } ,

    },
    {
        timestamps: true,
        versionKey: false,
    }
);

//Once the Schema is created, it must be implemented
//1st argument ('users') is the name of the collection
//2nd argument (UserSchema) is what it feds it
const TicketModel = model('tickets', TicketSchema);

export default TicketModel;