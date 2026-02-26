import express from 'express';
const port = process.env.PORT || 5000;
const app = express();
import { api } from './api';

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the Node server!' });
});

app.use(api);

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`),
);
