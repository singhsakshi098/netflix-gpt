import OpenAI from "openai";
import { API_KEYS } from "./constants";

const openai = new OpenAI({
    apiKey: API_KEYS,
    dangerouslyAllowBrowser: true, 
});

export default openai;