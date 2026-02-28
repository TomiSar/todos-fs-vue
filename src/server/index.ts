import express from 'express';
import { api } from './api';
const port = process.env.PORT || 5000;
const app = express();
import session from 'cookie-session';
import { auth } from './auth';

app.use(
  session({
    secret: process.env['SESSION_SECRET'] || 'my secret',
  }),
);

app.use(auth);
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the Node server!' });
});

app.use(api);

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`),
);
