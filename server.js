
import app from './app.js';



const PORT = process.env.PORT ?? 5000;

function connectToServer() {
  app.listen(PORT, () => console.log('Connected to server'));
}
connectToServer();

