/** Esta ruta nos va a devolver un array de objetos, que va a venir de una base de datos (carpeta config)*/

import {Router } from "express";
import {get_Grupos, get_Grupo, update_Grupo, delete_Grupo, join_Grupo, create_Grupo, insert_TicketGrupo, exit_Grupo, get_GrupoCode, get_populateGrupo as get_GrupoPopulate, get_AllGrupoCodigos} from "../controllers/grupo";

const router = Router(); //es el manejador de las rutas, las interpreta, con esto podremos crear los GET, POST ....

/**
 * http://localhost:3002/items [GET]
 */
router.get("/all", get_Grupos);             
router.get("/get/:idGrupo", get_Grupo);
router.get("/code/find/:idGrupo", get_GrupoCode);
router.get("/code/all", get_AllGrupoCodigos);
router.get("/populate/:idGrupo", get_GrupoPopulate);
router.put("/put/:idGrupo", update_Grupo);
router.post("/post", create_Grupo);
router.delete("/delete/:idGrupo", delete_Grupo);
router.post("/join", join_Grupo);
router.post("/exit", exit_Grupo);
router.put("/", insert_TicketGrupo);



export {router};
