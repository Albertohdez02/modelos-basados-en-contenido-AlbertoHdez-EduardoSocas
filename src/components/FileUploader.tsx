import React, { useState } from "react";

type Doc = { name: string; content: string };

/**
 * Componente para subir archivos: documentos, stopwords y lematizador.
 * Cada uno tiene su propio input y se notifica al padre mediante callbacks.
 */
interface Props {
  onDocsLoaded: (docs: Doc[]) => void;
  onStopwordsLoaded: (words: string[]) => void;
  onLemmatizerLoaded: (map: Record<string, string>) => void;
}

/**
 * FileUploader permite subir múltiples documentos de texto,
 * un fichero de stopwords y un fichero de lematización.
 * @param param0
 * @returns 
 */
const FileUploader: React.FC<Props> = ({
  onDocsLoaded,
  onStopwordsLoaded,
  onLemmatizerLoaded,
}) => {
  const [docCount, setDocCount] = useState(0);
  const [stopCount, setStopCount] = useState(0);
  const [lemmaCount, setLemmaCount] = useState(0);

  // ayuda a parsear las stopwords desde un .txt
  const parseStopwords = (text: string) =>
    text
      .split(/\r?\n/)
      .map((w) => w.trim().toLowerCase())
      .filter(Boolean);

  /**
   * Lematizador soportado:
   * - JSON: { "hablando": "hablar", "niños": "niño" }
   * - TXT: una pareja por línea, separada por espacio o coma:
   *   hablando hablar
   *   niños,niño
   */
  const parseLemmatizer = (text: string): Record<string, string> => {
    const trimmed = text.trim();
    // si parece JSON...
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      try {
        const obj = JSON.parse(trimmed);
        // normaliza claves/valores a minúsculas
        return Object.fromEntries(
          Object.entries(obj).map(([k, v]) => [k.toLowerCase(), String(v).toLowerCase()])
        );
      } catch {
        // si falla, cae a TXT
      }
    }
    // en caso de TXT...
    const map: Record<string, string> = {};
    trimmed
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean)
      .forEach((line) => {
        const parts = line.split(/[,\s]+/).map((x) => x.trim()).filter(Boolean);
        if (parts.length >= 2) {
          const from = parts[0].toLowerCase();
          const to = parts[1].toLowerCase();
          map[from] = to;
        }
      });
    return map;
  };

  /**
   * Maneja la subida de múltiples documentos.
   * @param ev evento de cambio del input file
   * @returns 
   */
  const handleDocs = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(ev.target.files ?? []);
    if (!files.length) return;

    const docs: Doc[] = await Promise.all(
      files.map(async (f) => ({ name: f.name, content: await f.text() }))
    );

    onDocsLoaded(docs);
    setDocCount(docs.length);
    ev.currentTarget.value = ""; // permitir re-seleccionar los mismos
  };

  const handleStopwords = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const words = parseStopwords(text);
    onStopwordsLoaded(words);
    setStopCount(words.length);
    ev.currentTarget.value = "";
  };

  const handleLemmatizer = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const map = parseLemmatizer(text);
    onLemmatizerLoaded(map);
    setLemmaCount(Object.keys(map).length);
    ev.currentTarget.value = "";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Documentos */}
      <div className="bg-white text-gray-800 p-4 rounded-xl shadow">
        <label className="block font-semibold mb-2">
          📄 Sube documentos (.txt) — múltiples
        </label>
        <input
          type="file"
          accept=".txt"
          multiple
          onChange={handleDocs}
          className="block w-full text-sm
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-indigo-50 file:text-indigo-700
                     hover:file:bg-indigo-100"
        />
        <p className="text-xs text-gray-500 mt-2">
          Selecciona uno o más <code>.txt</code> con el contenido (ES/EN).
        </p>
        {docCount > 0 && (
          <p className="text-xs text-green-600 mt-2">Cargados: {docCount} documento(s)</p>
        )}
      </div>

      {/* Stopwords */}
      <div className="bg-white text-gray-800 p-4 rounded-xl shadow">
        <label className="block font-semibold mb-2">
          📝 Stopwords (.txt)
        </label>
        <input
          type="file"
          accept=".txt"
          onChange={handleStopwords}
          className="block w-full text-sm
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-indigo-50 file:text-indigo-700
                     hover:file:bg-indigo-100"
        />
        <p className="text-xs text-gray-500 mt-2">
          Un término por línea (se ignoran vacíos).
        </p>
        {stopCount > 0 && (
          <p className="text-xs text-green-600 mt-2">Stopwords: {stopCount}</p>
        )}
      </div>

      {/* Lematizador */}
      <div className="bg-white text-gray-800 p-4 rounded-xl shadow">
        <label className="block font-semibold mb-2">
          🔤 Lematizador (.txt o .json)
        </label>
        <input
          type="file"
          accept=".txt,.json"
          onChange={handleLemmatizer}
          className="block w-full text-sm
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-indigo-50 file:text-indigo-700
                     hover:file:bg-indigo-100"
        />
        <p className="text-xs text-gray-500 mt-2">
          Formatos soportados:
          <br />• JSON: {"{ \"hablando\": \"hablar\" }"}
          <br />• TXT: <code>palabra lema</code> o <code>palabra,lema</code> por línea
        </p>
        {lemmaCount > 0 && (
          <p className="text-xs text-green-600 mt-2">Lemas cargados: {lemmaCount}</p>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
