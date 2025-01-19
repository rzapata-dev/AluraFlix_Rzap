import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
//npm run start:api
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const videosFilePath = path.join(__dirname, 'videos.json');

const generateId = () => {
  return Math.floor(Math.random() * 1000000).toString();
};

const readVideosFromFile = () => {
  const data = fs.readFileSync(videosFilePath, 'utf8');
  return JSON.parse(data);
};

const writeVideosToFile = (videos) => {
  fs.writeFileSync(videosFilePath, JSON.stringify(videos, null, 2), 'utf8');
};

// Obtener todos los videos
app.get('/api/videos', (req, res) => {
  const videos = readVideosFromFile();
  res.json(videos);
});

// Crear un nuevo video
app.post('/api/videos', (req, res) => {
  console.log('Datos recibidos:', req.body); // Agregar este console.log para ver los datos recibidos
  const newVideo = {
    id: generateId(),
    ...req.body
  };
  console.log('Nuevo video creado:', newVideo); // Agregar este console.log para ver el nuevo video creado
  const videos = readVideosFromFile();
  videos.push(newVideo);
  writeVideosToFile(videos);
  res.status(201).json(newVideo);
});

// Actualizar un video existente
app.put('/api/videos/:id', (req, res) => {
  const { id } = req.params;
  const updatedVideo = req.body;
  let videos = readVideosFromFile();
  videos = videos.map(video => video.id === id ? updatedVideo : video);
  writeVideosToFile(videos);
  res.json(updatedVideo);
});

// Eliminar un video
app.delete('/api/videos/:id', (req, res) => {
  const { id } = req.params;
  let videos = readVideosFromFile();
  videos = videos.filter(video => video.id !== id);
  writeVideosToFile(videos);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
