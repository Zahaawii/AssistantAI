# 🧠 Personal Assistant LLM

This project aims to build a **lightweight, local-first Large Language Model (LLM)**–powered assistant that can respond intelligently using **user-provided data**.  
Think of it as your own **context-aware personal assistant** — one that learns from the documents you give it.

At its core, it connects to a **ChromaDB (Cloud)** instance, allowing document storage, vector embeddings, and retrieval-augmented generation (RAG) queries.

---

## ⚙️ Current Functionality

✅ Connected to **ChromaDB (Cloud)**  
✅ CLI interface allows prompting via terminal — queries are sent to ChromaDB and responses are generated  
✅ Supports **document upload and storage** within ChromaDB for contextual responses  
✅ **Frontend implemented** — users can now chat directly with the bot through a web interface

---

## 🧩 Next Step: File Upload via Frontend

The next major feature is adding a **file upload button** in the web interface that allows users to:
- Open a window and select documents to upload  
- Store those documents automatically in the ChromaDB database  
- Use the uploaded content as additional knowledge for future queries  

This will fully connect the backend knowledge base to the frontend user experience.

---

## 🔗 Useful Resources

Below are some of the references and documentation used while building this project:

- [Google AI Studio](https://aistudio.google.com/)  
- [Gemini API: Document Processing (JavaScript)](https://ai.google.dev/gemini-api/docs/document-processing#javascript)  
- [YouTube: Build a Gemini App with LangChain and Node.js](https://www.youtube.com/watch?v=ozq9fK9Pn-s&t=77s)  
- [ChromaDB: Getting Started](https://docs.trychroma.com/docs/overview/getting-started?lang=typescript)  
- [ChromaDB Cloud Client](https://docs.trychroma.com/docs/run-chroma/cloud-client?lang=typescript)  
- [ChromaDB + Gemini Embeddings Integration](https://docs.trychroma.com/integrations/embedding-models/google-gemini?lang=typescript)  
- [Node.js File Reading Docs](https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs)  
- [Visual Studio Code: Node.js Setup](https://code.visualstudio.com/docs/nodejs/nodejs-tutorial)  
- [VS Code: TypeScript Compilation](https://code.visualstudio.com/docs/typescript/typescript-compiling)  
- [Docker Deployment Guide for Chroma](https://docs.trychroma.com/guides/deploy/docker?lang=typescript)  
- [Medium: Building a RAG System with Gemini and ChromaDB](https://medium.com/data-on-cloud-genai-data-science-and-data/building-a-rag-system-with-gemini-and-chromadb-6ead6452bcf5)  
- [W3Schools: Node.js REST API](https://www.w3schools.com/nodejs/nodejs_rest_api.asp)  
- [Express.js CORS Middleware](https://expressjs.com/en/resources/middleware/cors.html)  
- [GeeksforGeeks: Handling Form Data in Express](https://www.geeksforgeeks.org/node-js/how-to-handle-form-data-in-express/)  
- [GeeksforGeeks: How HTTP POST Requests Work in Node.js](https://www.geeksforgeeks.org/node-js/how-http-post-request-work-in-node-js/)  

---

## 🚧 Project Status

The project is **actively under development**.  
The **backend and frontend chat interface** are now functional — enabling real-time question-answer interactions.  
Next up: **document upload from the browser** and improved database integration.

Stay tuned for updates!

---

## 🤝 Contributing

Contributions, ideas, and discussions are welcome.  
Open an issue or submit a pull request to collaborate.

---

## 📄 License

[MIT](LICENSE)
