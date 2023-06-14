import express from "express";
import { createServer } from "http";
import "dotenv/config";
import { Server } from "socket.io";
import cors from "cors";
import config from "config";
import { router } from "./routes";
import db from "./config/mongo";
import logger from "./utils/logger";
import { version } from "../package.json";

import socket from "./socket";


const PORT = process.env.PORT || 3000;  
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
db().then(() => console.log("Connection is ready"));
app.listen(PORT, () => console.log(`Hey! Listening por el puerto ${PORT}`));
/*
const port = config.get<number>("port");
const host = config.get<string>("host");
const corsOrigin = "*"

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
});

app.get("/", (_, res) =>
  res.send(`Server is up and running version ${version}`)
);

httpServer.listen(port, host, () => {
  logger.info(`🚀 Server version ${version} is listening 🚀`);
  logger.info(`http://${host}:${port}`);

  socket({ io });
});
*/