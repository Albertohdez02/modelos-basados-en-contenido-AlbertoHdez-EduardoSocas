// interface DocumentProps {
//   name: string;
//   terms: { index: number; term: string; tf: number; idf: number; tfidf: number }[];
// }

// export default function DocumentResults({ name, terms }: DocumentProps) {
//   return (
//     <div className="bg-white p-4 rounded-xl shadow mb-6">
//       <h2 className="text-lg font-semibold mb-2">📄 {name}</h2>
//       <table className="min-w-full border text-center">
//         <thead>
//           <tr>
//             <th className="border border-gray-700 px-4 py-2">Índice</th>
//             <th className="border border-gray-700 px-4 py-2">Término</th>
//             <th className="border border-gray-700 px-4 py-2">TF</th>
//             <th className="border border-gray-700 px-4 py-2">IDF</th>
//             <th className="border border-gray-700 px-4 py-2">TF-IDF</th>
//           </tr>
//         </thead>
//         <tbody>
//           {terms.map(t => (
//             <tr key={t.index}>
//               <td className="border border-gray-700 px-4 py-2">{t.index}</td>
//               <td className="border border-gray-700 px-4 py-2">{t.term}</td>
//               <td className="border border-gray-700 px-4 py-2">{t.tf.toFixed(3)}</td>
//               <td className="border border-gray-700 px-4 py-2">{t.idf.toFixed(3)}</td>
//               <td>{t.tfidf.toFixed(3)}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


type Row = { index: number; term: string; tf: number; idf: number; tfidf: number };

export default function DocumentResults({ name, terms }: { name: string; terms: Row[] }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <h3 className="text-lg font-semibold mb-3">📄 {name}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-center border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2">Índice</th>
              <th className="border px-3 py-2">Término</th>
              <th className="border px-3 py-2">TF</th>
              <th className="border px-3 py-2">IDF</th>
              <th className="border px-3 py-2">TF-IDF</th>
            </tr>
          </thead>
          <tbody>
            {terms.map((t) => (
              <tr key={`${t.term}-${t.index}`} className="hover:bg-gray-50">
                <td className="border px-3 py-2">{t.index}</td>
                <td className="border px-3 py-2">{t.term}</td>
                <td className="border px-3 py-2">{t.tf.toFixed(3)}</td>
                <td className="border px-3 py-2">{t.idf.toFixed(3)}</td>
                <td className="border px-3 py-2">{t.tfidf.toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
