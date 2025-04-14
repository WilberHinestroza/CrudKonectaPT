export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  if (token !== 'fakeToken123') return res.sendStatus(403);
  
  req.user = { id: 1, name: 'Fake User' };
  next();
};