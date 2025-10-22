import React from "react";

interface FileUploaderProps {
  onFileLoaded: (text: string) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileLoaded }) => {
  const handleFileTexts = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    // Leer cada fichero y notificar al padre por cada uno
    for (const file of files) {
      const text = await file.text();
      onFileLoaded(text);
    }

    // opcional: limpiar el input para permitir volver a seleccionar los mismos ficheros
    event.currentTarget.value = "";
  };

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    onFileLoaded(text);
  };

  return (
    <div>
    <div className="bg-white text-gray-800 p-4 rounded-xl shadow">
      <label className="block font-semibold mb-2">
        Sube los ficheros de texto en español o inglés:
      </label>
      <input
        type="file"
        accept=".txt"
        onChange={handleFileTexts}
        className="block w-full text-sm
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-md file:border-0
                   file:text-sm file:font-semibold
                   file:bg-indigo-50 file:text-indigo-700
                   hover:file:bg-indigo-100"
      />
      <p className="text-xs text-gray-500 mt-2">
        Selecciona los ficheros <code>.txt</code> con los textos en español o inglés.
      </p>
    </div>
        <div className="bg-white text-gray-800 p-4 rounded-xl shadow">
      <label className="block font-semibold mb-2">
        Sube el fichero de palabras de parada:
      </label>
      <input
        type="file"
        accept=".txt"
        onChange={handleFile}
        className="block w-full text-sm
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-md file:border-0
                   file:text-sm file:font-semibold
                   file:bg-indigo-50 file:text-indigo-700
                   hover:file:bg-indigo-100"
      />
      <p className="text-xs text-gray-500 mt-2">
        Selecciona el fichero <code>.txt</code> con las palabras de parada del idioma.
      </p>
    </div>
            <div className="bg-white text-gray-800 p-4 rounded-xl shadow">
      <label className="block font-semibold mb-2">
        Sube el fichero de lematización de términos:
      </label>
      <input
        type="file"
        accept=".txt"
        onChange={handleFile}
        className="block w-full text-sm
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-md file:border-0
                   file:text-sm file:font-semibold
                   file:bg-indigo-50 file:text-indigo-700
                   hover:file:bg-indigo-100"
      />
      <p className="text-xs text-gray-500 mt-2">
        Selecciona el fichero <code>.JSON</code> con la lematización.
      </p>
    </div>
    </div>
  );
};

export default FileUploader;

