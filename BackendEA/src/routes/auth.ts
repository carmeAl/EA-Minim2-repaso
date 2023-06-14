import{Router}from "express";
import { registerCtrl,loginCtrl, registerCtrlGoogle} from "../controllers/user";

const router=Router();
/** http://localhost:3002/auth/register */
router.post("/register",registerCtrl);
router.post("/registerGoogle",registerCtrlGoogle);
router.post("/login",loginCtrl);

export{router};