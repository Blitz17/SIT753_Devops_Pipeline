import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import calculatorRoutes from './routes/calculatorroutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/calculator.html'));
});

app.get('/metrics', (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(client.register.metrics());
});

app.use('/', calculatorRoutes);

app.listen(port, '0.0.0.0', () => {
    console.log(`[SERVER] Server running at http://localhost:${port}`);
});
