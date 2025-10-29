import React from "react";

interface ResultsTableProps {
  data: any;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="bg-gray-800 p-4 rounded-xl shadow text-gray-400">
        No hay resultados aún.
      </div>
    );
  }

  if (!data.utilityMatrix) {
    return (
      <div className="bg-gray-800 p-4 rounded-xl shadow text-red-400">
        Error: los datos recibidos no contienen una matriz válida.
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow overflow-x-auto">
      <table className="min-w-full border border-gray-700 text-center">
        <thead>
          <tr>
            <th className="border border-gray-700 px-4 py-2">Índice del Término</th>
            <th className="border border-gray-700 px-4 py-2">Término</th>
            <th className="border border-gray-700 px-4 py-2">TF</th>
            <th className="border border-gray-700 px-4 py-2">IDF</th>
            <th className="border border-gray-700 px-4 py-2">TF-IDF</th>
          </tr>
        </thead>
        <tbody>
          {data.resultsTable.map((row: any, i: number) => (
            <tr key={i}>
              <td className="border border-gray-700 px-4 py-2">
                {Array.isArray(row.termIndex ?? row.termindex)
                  ? (row.termIndex ?? row.termindex).join(", ")
                  : (row.termIndex ?? row.termindex ?? `U${i + 1}`)}
              </td>
              <td className="border border-gray-700 px-4 py-2">
                {row.term ?? "-"}
              </td>
              <td className="border border-gray-700 px-4 py-2">
                {row.tf == null ? "-" : Number(row.tf).toFixed(2)}
              </td>
              <td className="border border-gray-700 px-4 py-2">
                {row.idf == null ? "-" : Number(row.idf).toFixed(2)}
              </td>
              <td className="border border-gray-700 px-4 py-2">
                {row.tfidf == null ? "-" : Number(row.tfidf).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
