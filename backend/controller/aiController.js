import {aiChat} from "../utils/chatGemini.js"

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

export { aiChatController };