import { useState } from "react";
import FileUploader from "../components/FileUploader";
import DocumentResults from "../components/DocumentResult";
import SimilarityMatrix from "../components/SimilarityMatrix";

export default function HomePage() {
  const [documents, setDocuments] = useState<{ name: string; content: string }[]>([]);
  const [stopwords, setStopwords] = useState<string[]>([]);
  const [lemmatizer, setLemmatizer] = useState<Record<string, string>>({});
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  //Llamada al backend
  const handleAnalyze = async () => {
    if (documents.length === 0) {
      alert("Debes subir al menos un documento.");
      return;
    }
    if (stopwords.length === 0) {
      alert("Debes subir el fichero de palabras de parada.");
      return;
    }
    if (Object.keys(lemmatizer).length === 0) {
      alert("Debes subir el fichero de lematización.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documents, stopwords, lemmatizer }),
      });
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error("Error:", err);
      alert("Error al analizar los documentos. Revisa la consola.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="w-full max-w-6xl bg-white p-8 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Sistema de Recomendación Basado en Contenido
        </h1>

        {/* --- Subida de ficheros --- */}
        <FileUploader
          onDocsLoaded={(docs) => setDocuments(docs)}
          onStopwordsLoaded={(words) => setStopwords(words)}
          onLemmatizerLoaded={(map) => setLemmatizer(map)}
        />

        {/* --- Botón de análisis --- */}
        <div className="text-center mt-8">
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50 transition"
          >
            {loading ? "Analizando..." : "Analizar documentos"}
          </button>
        </div>

        {/* --- Resultados --- */}
        {results && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4 text-center">Resultados</h2>

            <div id="contenedor">
              {/* Sección: Resultados por documento */}
              {results.documents.map((doc: any, i: number) => (
                <DocumentResults key={i} name={doc.name} terms={doc.terms} />
              ))}
            </div>

            <div id="contenedor-matriz">
            {/* Sección: Matriz de similitud coseno */}
            <SimilarityMatrix
              matrix={results.similarityMatrix}
              docNames={results.documents.map((d: any) => d.name)}
            />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
