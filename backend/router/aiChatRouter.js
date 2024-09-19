import express from "express";
const Router = express.Router();

import { aiChatController } from "../controller/aiController.js";

Router.post("/get-result", aiChatController);  

export default Router;