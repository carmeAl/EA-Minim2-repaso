/** Esta ruta nos va a devolver un array de objetos, que va a venir de una base de datos (carpeta config)*/

import {Router} from "express";
// import { updateAsignacion } from "../services/asignacion";
import { create_Completado, delete_Completado } from "../controllers/completado";

const router = Router(); //es el manejador de las rutas, las interpreta, con esto podremos crear los GET, POST ....

/**
 * http://localhost:3002/items [GET]
 */
router.post("/", create_Completado);
// router.put("/:idAsignacion", update_Asignacion);
router.delete("/:idAsignacion", delete_Completado);

export {router};
