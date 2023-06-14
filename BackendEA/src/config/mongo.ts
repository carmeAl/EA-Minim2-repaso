import "dotenv/config"; //Implements variables de entorno
import {connect} from "mongoose"; //connect function is from mongoose

// To connect to MongoDB
async function dbConnect(): Promise<void>{
    const DB_URI=<string>process.env.DB_URI; //Necesitamos una variable nueva que se llama DB_URI.
                                             //Esta variable hace referencia a lo que es el string para conectarnos al Mongo.
                                             //Tenemos que ir al archivo .env y crear la misma variable
    console.log("DB_URI: ", DB_URI);
    const options = {
        autoIndex: false, // Don't build indexes
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 155000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 145000, // Close sockets after 45 seconds of inactivity
        family: 4 // Use IPv4, skip trying IPv6
      };
          await connect(DB_URI, options);
}

//Connection exported ready to be used
export default dbConnect;

//mongoose funciona a traves de esquemas. Un es una representacion de los datos que se van almacenar en la BBDD