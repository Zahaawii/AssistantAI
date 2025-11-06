import { CloudClient } from "chromadb";
import { GoogleGeminiEmbeddingFunction } from "@chroma-core/google-gemini";
import { GoogleGenAI } from "@google/genai";
import express from "express";
import cors from "cors";


//Implemeneting Express to make a controller, so users can access it.
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());



app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

const client = new CloudClient({
  apiKey: process.env.CHROMADB_API_KEY,
  tenant: '37f4ff04-8a40-4a5c-ba87-77b9e4b5d60d',
  database: 'Test'
});

const embedder = new GoogleGeminiEmbeddingFunction({
  apiKey: process.env.GOOGLE_API_KEY,
});

const collection = await client.getOrCreateCollection({
  name: "test_api",
  embeddingFunction: embedder,
})

let questionAsked = "";
let response = "";


app.get('/', (req, res) => {
  res.sendFile('index.html', { root: '/Users/zahaawii/IdeaProjects/personalChatBotJS/'});
});

app.post('/api/question', async (req, res) => {
  console.log("Entering the POST request");
  questionAsked = req.body.text;
  console.log("POST request generated:");
  console.log(`Question asked: ${questionAsked}`);

  // Control the query result based on the user question with the code down below and then pass it out to gemini
  const results = await collection.query({
    queryTexts: [questionAsked],
    //Choose the result number, std is 10: 
    nResults: 5,
  });


  const content = [
    {
      text:
        `Take the giving results from the query and answer questions using text from the reference passage included
        CONTEXT: ${results.documents}
        QUESTION: ${questionAsked}`
    }
  ];

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: content,
    config: {
      systemInstruction:
        `
        You are a personal knowledge-base chatbot with the name KnowledgeBot.
        Your sole purpose is to answer questions strictly based on the vector data reported back from the query.
        You must only use information contained in the text from the context result
        
        Rules:
        1. You must only use information contained in the text from the context result or explicitly added knowledge sources.
        2. If a user asks a question not covered by the vector query
        "The answer is not within my current knowledge. Please ask the system administrator to upload a relevant knowledge base article so I can assist you."
        3. You must not generate, assume, infer, or hallucinate any content beyond the user-provided data.
        4. You must not access the internet, external databases, or any pre-trained world knowledge.
        5. You must not alter or reinterpret the uploaded content. Your answers should reflect it faithfully and factually.
        6. Keep answers concise, accurate, and sourced from the documents when possible.

        Goal:
        Act as a controlled retrieval-augmented assistant that provides accurate responses exclusively grounded in the uploaded material. When uncertain, 
        defer to the system administrator for new knowledge uploads.
      `,
      thinkingConfig: {
        thinkingBudget: 0,
      },
    }
  });
  res.send(response.text);
  console.log(response.text);
});

//console.log("Trying to see if the bot responds correctly")

// const content = [
//   { text: 
//     `Take the giving results from the query and answer questions using text from the reference passage included
//     CONTEXT: ${results.documents}
//     QUESTION: ${questionAsked}`}
// ];


// const response = await ai.models.generateContent( {
//   model: 'gemini-2.5-flash',
//   contents: content,
//   config: {
//           systemInstruction: 
//           `
//     You are a personal knowledge-base chatbot with the name KnowledgeBot.
//     Your sole purpose is to answer questions strictly based on the vector data reported back from the query.
//     You must only use information contained in the text from the context result

//     Rules:
//     1. You must only use information contained in the text from the context result or explicitly added knowledge sources.
//     2. If a user asks a question not covered by the vector query
//     "The answer is not within my current knowledge. Please ask the system administrator to upload a relevant knowledge base article so I can assist you."
//     3. You must not generate, assume, infer, or hallucinate any content beyond the user-provided data.
//     4. You must not access the internet, external databases, or any pre-trained world knowledge.
//     5. You must not alter or reinterpret the uploaded content. Your answers should reflect it faithfully and factually.
//     6. Keep answers concise, accurate, and sourced from the documents when possible.

//     Goal:
//     Act as a controlled retrieval-augmented assistant that provides accurate responses exclusively grounded in the uploaded material. When uncertain, 
//     defer to the system administrator for new knowledge uploads.
//   `,
//   thinkingConfig: {
//     thinkingBudget: 0,
//   },
//   }
// });


// console.log(response.text);

app.listen(8080, () => {
  console.log('REST API server running on port 8080');
});

