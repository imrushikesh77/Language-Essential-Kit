import express from "express";
const app = express();
import cors from "cors";
import Router from "./router/aiChatRouter.js";

app.use(cors());    
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/get-result", Router);

export default app;