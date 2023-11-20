import express from "express";
import { createServer } from "http";
import { json } from "body-parser";
import "dotenv/config";
import cors from "cors";

import "./config/db";
import { userRoute } from "./user";
import {chatRoute} from "./chat"
import { configureSocket } from "./common/socket";

const app = express();
const httpServer = createServer(app);

//Secure chat route
const io = configureSocket(httpServer);

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.use(json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors());
app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);

httpServer.listen(PORT, () => {
  console.log(`Server Running at http://${HOST}:${PORT}/`);
});
