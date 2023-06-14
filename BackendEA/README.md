Proyecto EA Grupo 2

Backend con Users, Grupos, Tickets, Productos y RelacionProductoUsuario hechos!

API completamente funcional a falta de retoques


IMPORTANT COMMANDS BEFORE USING VISUAL STUDIO CODE

    tsc --init \
    npm init -y \
    npm i express cors dotenv multer mongoose bcryptjs jsonwebtoken \
    npm i @types/express @types/cors @types/dotenv @types/multer @types/mongoose @types/bcryptjs @types/jsonwebtoken -D

Fichero .env

    PORT=3000
    DB_URI="mongodb://127.0.0.1:27017/EA-DDBB"
    JWT_SECRET=secrettoken
