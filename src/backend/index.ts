import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { analyzeDocuments } from "./analyzer.js";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

// endpoint único para analizar documentos
app.post("/api/analyze", (req, res) => {
  try {
    const { documents, stopwords, lemmatizer } = req.body;
    const result = analyzeDocuments(documents, stopwords, lemmatizer);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
