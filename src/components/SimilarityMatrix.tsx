import React from "react";

interface SimilarityMatrixProps {
  matrix: number[][];
  docNames: string[];
}

/**
 * Muestra la matriz simétrica de similaridad coseno entre documentos.
 */
const SimilarityMatrix: React.FC<SimilarityMatrixProps> = ({ matrix, docNames }) => {
  if (!matrix || matrix.length === 0) {
    return (
      <div className="bg-white p-4 rounded-xl shadow text-center text-gray-500">
        No hay matriz de similitud disponible.
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-8 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Matriz de Similaridad Coseno
      </h2>

      <table className="min-w-full border-collapse text-center text-sm">
        <thead>
          <tr>
            <th className="border bg-gray-100 px-3 py-2"></th>
            {docNames.map((name, i) => (
              <th
                key={`col-${i}`}
                className="border bg-gray-100 px-3 py-2 font-medium text-gray-700"
              >
                {name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {matrix.map((row, i) => (
            <tr key={`row-${i}`} className="hover:bg-gray-50 transition">
              <th className="border bg-gray-100 px-3 py-2 font-medium text-gray-700">
                {docNames[i]}
              </th>
              {row.map((val, j) => (
                <td
                  key={`cell-${i}-${j}`}
                  className={`border px-3 py-2 ${
                    i === j
                      ? "bg-green-100 font-semibold text-green-700 diagonal"
                      : "text-gray-800"
                  }`}
                >
                  {val.toFixed(3)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-xs text-gray-500 mt-4 text-center">
        * Los valores cercanos a 1 indican alta similitud entre documentos.
      </p>
    </div>
  );
};

export default SimilarityMatrix;
