import { json, Router } from 'express';
import type { UserInfo } from 'remult';

const validUsers: UserInfo[] = [
  { id: '1', name: 'Admin', roles: ['admin'] },
  { id: '2', name: 'Jane', roles: ['editor'] },
  { id: '3', name: 'John', roles: ['editor'] },
];

export const auth = Router();
auth.use(json());

auth.post('/api/signIn', (req, res) => {
  const user = validUsers.find((user) => user.name === req.body.username);
  if (user) {
    req.session!['user'] = user;
    res.json({ success: true, user });
  } else {
    res.status(404).json({ success: false, message: 'Invalid username' });
  }
});

auth.post('/api/signOut', (req, res) => {
  req.session!['user'] = null;
  res.json({ success: true, message: 'Signed out' });
});

auth.get('/api/currentUser', (req, res) => {
  const user = req.session!['user'];
  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(404).json({ success: false, message: 'No user signed in' });
  }
});
