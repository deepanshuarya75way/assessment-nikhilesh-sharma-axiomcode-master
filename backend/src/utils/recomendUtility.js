const { GoogleGenAI } = require("@google/genai");
const Recomend=require("../models/recommendation");
const getRecomendation = async (req, res) => {
try {
const {title, code,description,results } = req.body;
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

async function main() {

    const response = await ai.models.generateContent({
        // Use Gemini as the DSA tutor for problem-specific guidance
        model: "gemini-2.5-flash-lite",
        contents: message,
        config: {
            maxOutputTokens: 500,
            systemInstruction : `
         You are an expert DSA Tutor for the platform Axiom Code. Help the user to get motivated .
         based on its submitted code ,your task is to generate one line clear ecomendation based on performance if performance is good you can 
         praise the user and suggest him to solve next difficulty level problem but if code submitted by user fails then you should recomend him by telling 
         clear mistake which he d done and by suggesting watching video tutorial , but here is case suppose user had submitted the code and its correct but its 
         not the optimal solution , then you can recomend him to solve the same problem more optimally .main goal is to not let getting 
         good programers bored while not let demotivated the weak programmers , you have to motivate all . 
         ###QUESTION BANK  - SUM OF N NUMBERS(EASY) , FACTORIAL OF N(MEDIUM), SUM OF ARRAY ELEMENTS(HARD) , i only had these 3 
          so suggest accordingly . but if the user solved hardest problem even then you should rpely something like repractice from basics to 
          make them stronger

          ### PROBLEM DETAILS:
            - **Title:** ${title}
            - **Description:** ${description}
            - **codesubmited by user:** ${JSON.stringify(code)}

          ### CODE ARCHITECTURE (The Three-Box System):
            You have access to the full code structure for this problem. The user only interacts with the "Initial Code".
            - **Start Code Configuration (JSON):** ${JSON.stringify(startCode)}
            %%strict instruction:**do no include any kind of unecessary comments in recomedation keep it single lined but to that point and clarifying the user%% . 
            `
        }
    });

    console.log( response.text);
    const outputResult = await Recomend.create({
           problemName:title,
           description:response.text,
        })
    res.status(201).json({
        message: outputResult
    });
 
}

await main();

} catch (err) {
console.error(err);
res.status(500).json({
    message: "Internal Server Error"
});
}}


module.exports = getRecomendation;


