import express from "express";
const Router = express.Router();

import { aiChatController, getAddress } from "../controller/aiController.js";

Router.post("/get-result", aiChatController);  
Router.get("/get-addresses",getAddress);

export default Router;