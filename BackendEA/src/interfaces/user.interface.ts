export interface User {
    name: string;
    surname: string;
    email: string;
    password: string;
    role: "Admin"| "User"; 
    isEnabled?: boolean;
}