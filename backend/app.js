import express from "express";
const app = express();
import cors from "cors";
import Router from "./router/aiChatRouter.js";

app.use(cors({
    origin: [
        'http://127.0.0.1:5500',
        'http://127.0.0.1:5500/frontend/main.html', 
        'https://imrushikesh77.github.io',
        'https://imrushikesh77.github.io/Language-Essential-Kit/main.html'
    ]
}));  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/", Router);

export default app;