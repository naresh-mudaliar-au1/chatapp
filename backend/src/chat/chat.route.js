import express from "express";
import chatController from "./chat.controller";

export default express
  .Router()
  .post("/event", chatController.eventApi)
  .get("/", chatController.getConversation);
