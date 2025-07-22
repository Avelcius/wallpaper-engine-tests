import express from 'express';
import cors from 'cors';             // <--- обязательно импортировать
import { WebSocketServer } from 'ws';

const app = express();
const port = process.env.PORT || 3000;

// Разрешаем все источники, включая 'null' (например, sandboxed iframe, file://, нестандартные прокси)
app.use(cors({
  origin: function(origin, callback) {
    callback(null, true); // разрешить любой origin
  },
  credentials: true // если нужны куки
}));

// === HTTP ===
app.get('/test', (req, res) => {
    // CORS middleware уже разрешает все источники, ручная установка не требуется
    res.json({ message: "Hello Avelc! (fetch работает)" });
});

const server = app.listen(port, () => {
  console.log(`✅ HTTP+WS: http://localhost:${port}/test`);
});

// === WebSocket ===
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log("🔌 WebSocket подключён");
  ws.send(JSON.stringify({ message: "Hello Avelc! (websocket работает)" }));
});


console.log(`✅ WS: ws://localhost:${port}`);
