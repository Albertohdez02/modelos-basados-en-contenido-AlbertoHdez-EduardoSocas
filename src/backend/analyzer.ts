//import { readFileSync } from "fs";

/**
 * Calcula el TF, IDF, TF-IDF y la matriz de similitud coseno entre documentos.
 */
export function analyzeDocuments(
  docs: { name: string; content: string }[],
  stopwords: string[],
  lemmatizer: Record<string, string>
) {
  // --- Tokenización y preprocesamiento ---
  const tokenized = docs.map(doc => tokenize(doc.content, stopwords, lemmatizer));

  const termSet = Array.from(new Set(tokenized.flat()));
  const N = docs.length;

  // --- TF (Term Frequency) ---
  const tf = tokenized.map(tokens =>
    termSet.map(t => tokens.filter(x => x === t).length / tokens.length)
  );

  // --- IDF (Inverse Document Frequency) ---
  const idf = termSet.map(t =>
    Math.log(N / (1 + tokenized.filter(tokens => tokens.includes(t)).length))
  );

  // --- TF-IDF ---
  const tfidf = tf.map(row => row.map((tf, i) => tf * idf[i]));

  // --- Similaridad coseno (matriz simétrica) ---
  const similarityMatrix = computeCosineMatrix(tfidf);

  // --- Estructura por documento ---
  const documents = docs.map((doc, i) => ({
    name: doc.name,
    terms: termSet.map((t, j) => ({
      index: j + 1,
      term: t,
      tf: tf[i][j],
      idf: idf[j],
      tfidf: tfidf[i][j]
    }))
  }));

  // --- Salida final ---
  return { documents, similarityMatrix };
}

/**
 * Limpia, tokeniza y lematiza el texto.
 */
function tokenize(text: string, stopwords: string[], lemmatizer: Record<string, string>): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-záéíóúñü0-9\s]/gi, "")
    .split(/\s+/)
    .filter(word => word && !stopwords.includes(word))
    .map(word => lemmatizer[word] || word);
}

/**
 * Calcula la similitud coseno entre dos vectores numéricos.
 */
function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, x, i) => sum + x * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, x) => sum + x * x, 0));
  const normB = Math.sqrt(b.reduce((sum, x) => sum + x * x, 0));
  return normA && normB ? dot / (normA * normB) : 0;
}

/**
 * Genera una matriz simétrica NxN de similitudes coseno.
 */
function computeCosineMatrix(tfidf: number[][]): number[][] {
  const n = tfidf.length;
  const matrix: number[][] = Array.from({ length: n }, () => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      const sim = cosineSimilarity(tfidf[i], tfidf[j]);
      matrix[i][j] = sim;
      matrix[j][i] = sim;
    }
  }

  return matrix;
}
