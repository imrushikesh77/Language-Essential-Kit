import { GoogleGenerativeAI } from "@google/generative-ai";

import {aiConfig} from "../config/setupGemini.js";

const genAI = new GoogleGenerativeAI(aiConfig.gemeni.apiKey);

const aiChat = async (city,nativeLanguage, category) => {
    const model = genAI.getGenerativeModel({
        model: aiConfig.gemeni.model,
        safetySettings: aiConfig.gemeni.safetySettings,
    });

    const prompt = `Fetch language essentials of ${category} so that user can communicate easily about that topic for the following inputs:
                1) Location: ${city} (The location where the user is traveling)
                2) Native language: ${nativeLanguage} (The user's language)
                3) Target language: {targetLanguage} (The language spoken at the location, use English if the user's language is the same as the location's language)

                Please provide a **well-formatted** JSON output with the following structure:
                {
                    "local language": "Phrase in the local language",
                    "local lang in english": "Transliteration of the local language phrase",
                    "native language": "Translation of the phrase in user's native language"
                }

                Ensure that the JSON includes an array of objects containing common travel-related essentials like greetings, asking for help, and polite expressions.

                Example:
                [
                    {
                        "local language": "कृपया",
                        "local lang in english": "krupaya",
                        "native language": "Please"
                    },
                    {
                        "local language": "नमस्ते",
                        "local lang in english": "namaste",
                        "native language": "Hello"
                    }
                ]

                Make sure the output is in the correct JSON format with no missing brackets or commas.
                Please do not provide any explanations or additional information in the JSON output.
`;
    try{
        const result = await model.generateContent(prompt);
        const chatResponse = result?.response?.text();

        return { result: chatResponse };
    }catch (error) {
        console.log("Error", error);
        return { Error: "Uh oh! Caught error while fetching data, try again later...!" };
      }
};

export {aiChat};