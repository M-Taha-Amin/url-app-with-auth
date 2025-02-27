import jwt from 'jsonwebtoken';

const verifyJwt = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(401).json({ message: 'Unauthorized Access' });
    return;
  }
  try {
    const decodedToken = jwt.verify(token, 'jwt-key');
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized Access' });
    return;
  }
};

export { verifyJwt };
