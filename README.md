# 🎯 Modelos basados en el contenido

Aplicación web desarrollada en **React + TypeScript + Express**, que implementa un **sistema de recomendación basado en contenido**.  

El proyecto permite subir tantos documentos de texto como deseemos, un fichero de texto con las palabras de parada y un fichero json con la lematización de terminos

-----------------------------------------------------------------------------

## 👨‍💻 Autores

- Alberto Antonio Hernández Hernández (alu0101433905)
- Eduardo Socas Luis (alu0101404622)
- Marcial Álvarez Parejo (alu0100996043)
- Pablo González Martín (alu0101421179)

Universidad de La Laguna  
Grado en Ingeniería Informática – Curso 2025/2026  
Asignatura: *Gestión de Conocimiento de las Organizaciones*


-----------------------------------------------------------------------------

## ⚙️ Requisitos previos

- 🟩 Node.js ≥ 18
- 📦 npm ≥ 9

-----------------------------------------------------------------------------

## 🚀 Instalación

Clona el proyecto y entra en el directorio raíz:
```
  git clone <URL_DEL_REPOSITORIO>
  cd modelos-basados-en-contenido-GCO-PE101
```

Instala todas las dependencias:
```
  npm install
```

Compilar el proyecto:
```
  npm run build
```
-----------------------------------------------------------------------------

## 🖥️ Ejecución del proyecto

La aplicación tiene **dos partes**:
un **frontend React** (Vite) y un **backend Express** (TypeScript).

1️⃣ Levantar el backend:
```
  npm run server

  ✅ Backend corriendo en http:localhost:3000
```
2️⃣ Levantar el frontend en otra terminal:
```
  npm run dev

  ➜ Local: http:localhost:5173/
```
Abre ese enlace en tu navegador.

-----------------------------------------------------------------------------

## 🧠 Uso de la aplicación

1. Sube tantos archivos txt como desees dentro de los que se categorizan como document-01.txt:
Dichos documentos tienen una estructura similar.

2. Subimos un fichero de palabras de paradas (vease ej. stop-words-en.txt):
   Dichos ficheros contienen las palabras de paradas que vamos a aplicar en la ejecución

3. Subimos un fichero de json con la lematización de términos.


-----------------------------------------------------------------------------

## 📊 Resultados mostrados

1. El sistema mostrará en pantalla los términos de cada documentos procesados junto a sus valores de frecuencia (TF), frecuencia inversa (IDF) y TF-IDF.

2. Bajo esto se mostrará la matriz de similaridad Coseno entre todos los documentos.

-----------------------------------------------------------------------------

## 🧱 Tecnologías utilizadas

| Área | Herramienta |
|------|--------------|
| Frontend | ⚛️ React + TypeScript + TailwindCSS |
| Backend | 🟦 Node.js + Express + TypeScript |
| Build | ⚡ Vite |
| Ejecución TS | 🧩 tsx |
| Estilo | 🎨 TailwindCSS |

-----------------------------------------------------------------------------

## 🧰 Scripts disponibles

| Comando | Descripción |
|----------|--------------|
| npm run dev | Inicia el servidor de desarrollo de Vite (frontend) |
| npm run server | Inicia el backend con Express (tsx en modo watch) |
| npm run build | Compila el frontend para producción |
| npm run preview | Previsualiza la app compilada |

-----------------------------------------------------------------------------

## 🧪 Ejemplo de prueba rápida

1. Ir al [este repositorio](https://github.com/ull-cs/gestion-conocimiento/tree/main/recommeder-systems/examples-utility-matrices) y descargue un fichero .txt con una matriz:
2. Inicia backend y frontend como se indica arriba.
3. Sube los ficheros desde la app → el sistema mostrará los terminos de cada documento y la matriz de similaridad Coseno


-----------------------------------------------------------------------------

## 📄 Informe de la práctica

Para esta práctica se ha realizado un informe en el que se plasma la ejecución de la aplicación con varios
parámetros distintos, en varios ficheros de pruebas distintos de matrices de tamaño variable. Este informe
se encuentra en este mismo repositorio en la ruta: 
```
/Informe-modelos-basados-en-contenido.pdf
```
