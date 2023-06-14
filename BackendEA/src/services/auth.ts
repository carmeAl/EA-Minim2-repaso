import { User } from "../interfaces/user.interface";
import UserModel from "../models/user";
import {insertUser} from "../services/user"
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";


const registerNewUser=async(user:User)=>{
    // Validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(user.email);
    if (!isValidEmail) {
        return "INVALID_EMAIL";
    }
    // Check if the password is blank
    if (user.password.trim() === "") {
        return "BLANK_PASSWORD";
    }
    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email: user.email });
    if (existingUser) {
        
        return "ALREADY_USER";
    }
    // Encrypt the user's password and insert the user into the database
    user.password = await encrypt(user.password);
    const newUser = await insertUser(user);
    return newUser;
};
const registerNewUserGoogle=async(user:User)=>{
    // Validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(user.email);
    if (!isValidEmail) {
        return "INVALID_EMAIL";
    }
    // Check if the password is blank
    if (user.password.trim() === "") {
        return "BLANK_PASSWORD";
    }
    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email: user.email });
    if (!existingUser) {
        // Encrypt the user's password and insert the user into the database
        user.password = await encrypt(user.password);
        const newUser = await insertUser(user);
        return newUser;
    }
};

const loginUser=async( email:string, password: string)=>{
    const checkIs =await UserModel.findOne({email})
    //Si el usuario NO existe
    if (!checkIs)return "NOT_FOUND_USER";
    //Obtener el password encriptado de la BBDD
    const passwordHash=checkIs.password;
    //Comparar la password de BBDD i del login
    const isCorrect=await verified(password,passwordHash);
    if(!isCorrect) return "PASSWORD_INCORRECT";
    
    console.log(checkIs.role);
    const token=generateToken(checkIs.email);
    const data={
        token,
        user:checkIs,
    }
    return data;
};

export{registerNewUser,loginUser, registerNewUserGoogle};