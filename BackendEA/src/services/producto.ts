//In charge to connect with the dB
import { Grupo } from "../interfaces/grupo.interface";
import { Types } from "mongoose";
import { User } from "../interfaces/user.interface";
import GrupoModel from "../models/grupo";
import UserModel from "../models/user";
import ProductoModel from "../models/producto";
import { Producto } from "../interfaces/producto.interface";
import { Asignacion } from "../interfaces/asignacion.interface";
import AsignacionModel from "../models/asignacion";

const insertProducto = async (item: Producto) => {
    const responseInsert = await ProductoModel.create(item);
    return responseInsert;
};



const getProdcutos = async () => {
    const responseItem = await ProductoModel.find({});
    return responseItem;
};

const getProducto = async (id: string) => {
    const responseItem = await ProductoModel.findOne({ _id: id }).populate('asignaciones');
    return responseItem;
};

const updateProducto = async (id: string, data: Producto) => {
    const responseItem = await ProductoModel.findOneAndUpdate({ _id: id }, data, { new: true });
    return responseItem;
};

const deleteProducto = async (id: string) => {
    const responseItem = await ProductoModel.findOneAndRemove({ _id: id });
    return responseItem;
}
const putAsignacionToProducto = async (idProducto: string, data: Asignacion) => {

    const productoBBDD = await ProductoModel.findOne({ _id: idProducto });
    if (productoBBDD != undefined) {
        var i: number = 0;
        var encontrado: boolean = false;
        var asignacion;
        while (i < productoBBDD.asignaciones.length && !encontrado) {
            asignacion = await AsignacionModel.findOne({ _id: productoBBDD.asignaciones[i] });
            if (asignacion != undefined) {
                encontrado = true;
            }
            i++;
        }
        if (encontrado && asignacion?.usuario==data.usuario) {
            const responseItem = await AsignacionModel.findOneAndUpdate({ _id: asignacion?.id }, data, { new: true });
            return responseItem;
        }
        if(!encontrado) {
            const responseInsert = await AsignacionModel.create(data);
            const responseItem = await ProductoModel.findOneAndUpdate({ _id: idProducto },
                { $addToSet: { asignaciones: new Types.ObjectId(responseInsert._id) } },
                { new: true }).populate('asignaciones');
            console.log(responseItem);
            return responseItem;
        }



    }




}

const getProductobyParametros = async (name: string, quantity: string, totalprice: string) => {
    const responseItem = await ProductoModel.findOne({ name: name,
        quantity: parseInt(quantity),
        totalprice: parseFloat(totalprice) });
    return responseItem?.id;
}

// const getAsignacionesUser = async(idProducto: string, idUser: string): Promise<Asignacion[]> => {


//     const producto: Producto | null = await ProductoModel.findById(IdProducto).populate('asignaciones').exec();

//     if (!producto) {
//       throw new Error('No se encontró el producto');
//     }

//     const asignacionesDeUsuario: Asignacion[] = producto.asignaciones.filter(asignacion =>
//       asignacion.usuario.includes(idUser)
//     );

//     const asignacionesDeUsuario = await 


//     return asignacionesDeUsuario;
// }



export { insertProducto, getProdcutos, getProducto, updateProducto, deleteProducto, putAsignacionToProducto, getProductobyParametros };
