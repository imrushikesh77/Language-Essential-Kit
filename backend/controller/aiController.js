import {aiChat} from "../utils/chatGemini.js"
import dotenv from "dotenv"
dotenv.config();


const MAP_KEY = process.env.MAP_KEY
const MAP_API = process.env.MAP_API

const aiChatController = async (req, res) => {
    try {

        const { city, language, category } = req.body;
        // console.log("city, language, category", city, language, category);
        
        const aiReply = await aiChat(city, language, category);
        if(aiReply.Error) {
            return res.status(500).json({Error : aiReply.Error});
        }
        res.status(200).json({result: aiReply.result});
    } catch (error) {
        res.status(500).json({ Error: "Caught error while fetching data, try again later...!" });
    }
}

const getAddress = async(req,res) => {
    const query = req.query.query;

    let requestOptions = {
        method: 'GET',
      };

    try {
        fetch(`${MAP_API}?text=${query}&apiKey=${MAP_KEY}&format=json&type=city`, requestOptions)
        .then(response => response.json())
        .then(data => {
            res.status(200).json(data.results);
        })
        .catch(error => console.log('error', error));
    } catch (error) {
        console.error(error);
        res.status(500).json("Error");
    }
}

export { aiChatController, getAddress };