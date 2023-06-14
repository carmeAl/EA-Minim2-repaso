/** Esta ruta nos va a devolver un array de objetos, que va a venir de una base de datos (carpeta config)*/

import {Router } from "express";
import { ticketsOfUser,gruposOfUser,deletePerson, getPerson, getPeople, postPerson, updatePerson, getPeoplePaginado, disablePerson} from "../controllers/user";

const router = Router(); //es el manejador de las rutas, las interpreta, con esto podremos crear los GET, POST ....

/**
 * http://localhost:3002/items [GET]
 */
router.get("/all", getPeople);
router.get("/allPaginado/:limite1/:pagina1", getPeoplePaginado);
router.get("/findOne/:idUser", getPerson);
router.post("/", postPerson);
router.put("/:idUser", updatePerson);
router.put("/disable/:idUser", disablePerson);

router.delete("/:idUser", deletePerson);
router.get("/grupos/:idUser", gruposOfUser);

router.get("/tickets/:idUser", ticketsOfUser);


export {router};
