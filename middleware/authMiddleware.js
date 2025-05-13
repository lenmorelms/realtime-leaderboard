import jwt from "jsonwebtoken";

const authMiddleware  = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = payload.userId;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;