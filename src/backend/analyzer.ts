// analyzer.ts

type DocIn = { name: string; content: string };
type DocRow = { index: number; term: string; tf: number; idf: number; tfidf: number };
type DocOut = { name: string; terms: DocRow[] };

export function analyzeDocuments(
  docs: DocIn[],
  stopwords: string[],
  lemmatizer: Record<string, string>
) {
  const N = docs.length;

  // 1) Tokenizar: normaliza, LEMATIZA y luego filtra stopwords
  const tokenized: string[][] = docs.map(d => tokenize(d.content, stopwords, lemmatizer));

  // 🔹 NUEVO: mapa de primera posición de cada término por documento
  const firstPosPerDoc: Array<Record<string, number>> = tokenized.map(tokens => {
    const pos: Record<string, number> = {};
    for (let i = 0; i < tokens.length; i++) {
      const w = tokens[i];
      if (pos[w] === undefined) pos[w] = i + 1; // posición 1-based
    }
    return pos;
  });

    // 2) Vocabulario por documento y vocabulario global (termSet) para TF/IDF
    //    - `termSetsPerDoc`: array donde cada posición contiene los términos únicos de ese documento
    //    - `termSet`: vocabulario global (todos los términos únicos de todos los documentos)
    const termSetsPerDoc: string[][] = tokenized.map(tokens => Array.from(new Set(tokens)));
    const termSet = Array.from(new Set(tokenized.flat()));
    const termIndex = new Map(termSet.map((t, i) => [t, i]));

  // 3) TF por documento (mismo orden que termSet)
  const tf: number[][] = tokenized.map(tokens => {
    const total = tokens.length || 1;
    return termSet.map(t => countIn(tokens, t) / total);
  });

  // 4) IDF global (suavizada y positiva)
  const idf: number[] = termSet.map(t => {
    const df = tokenized.filter(tokens => tokens.includes(t)).length;
    return Math.log((N + 1) / (df + 1)) + 1; // > 0
  });

  // 5) TF-IDF por doc
  const tfidf: number[][] = tf.map(row => row.map((v, i) => v * idf[i]));

  // 6) Matriz de similaridad coseno (simétrica)
  const similarityMatrix = computeCosineMatrix(tfidf);

  // 7) SALIDA POR DOCUMENTO
  //    - index = primera ocurrencia real del término en el texto
  //    - ordenar por esa posición
  const documents: DocOut[] = docs.map((doc, i) => {
    const rows: DocRow[] = [];
    // Usar el termset propio del documento para construir la salida
    const myTerms = termSetsPerDoc[i];
    for (let k = 0; k < myTerms.length; k++) {
      const term = myTerms[k];
      const idx = termIndex.get(term) ?? -1;
      if (idx === -1) continue; // inseguridad: si no existe en el vocabulario global
      const tfv = tf[i][idx];
      if (tfv > 0) {
        rows.push({
          index: firstPosPerDoc[i][term] ?? -1,
          term,
          tf: tfv,
          idf: idf[idx],
          tfidf: tfidf[i][idx],
        });
      }
    }

    // Mantener comportamiento previo: no reindexar por ahora (index guarda posición de aparición)
    return { name: doc.name, terms: rows };
  });

    return { documents, similarityMatrix, termSet, termSetsPerDoc };
}

/* -------------------- Helpers -------------------- */

function tokenize(
  text: string,
  stopwords: string[],
  lemmatizer: Record<string, string>
): string[] {
  const stop = new Set(stopwords.map(w => w.replace(/[’‘]/g, "'")));
  return text
    .toLowerCase()
    .split(/\s+/)
    .map(w => w.replace(/[’‘]/g, "'"))
    .map(w => w.replace(/[^a-z'áéíóúñü0-9\s]/gi, ""))
    .map(w => w.trim())
    .filter(Boolean)
    // 1º lematiza
    .map(w => (lemmatizer[w] ? String(lemmatizer[w]).toLowerCase() : w))
    // 2º filtra stopwords
    .filter(w => !stop.has(w));
}

function countIn(tokens: string[], t: string): number {
  let c = 0;
  for (const w of tokens) if (w === t) c++;
  return c;
}

function cosine(a: number[], b: number[]): number {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  const denom = Math.sqrt(na) * Math.sqrt(nb);
  return denom ? dot / denom : 0;
}

function computeCosineMatrix(tfidf: number[][]): number[][] {
  const n = tfidf.length;
  const M = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    M[i][i] = 1;
    for (let j = i + 1; j < n; j++) {
      const s = cosine(tfidf[i], tfidf[j]);
      M[i][j] = s;
      M[j][i] = s;
    }
  }
  return M;
}
