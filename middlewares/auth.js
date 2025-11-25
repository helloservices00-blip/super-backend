import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const auth = (roles = []) => {
  return (req, res, next) => {
    try {
      const header = req.headers.authorization || '';
      const token = header.split(' ')[1];
      if(!token) return res.status(401).json({message: 'No token provided'});
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
      req.user = decoded;
      if(roles.length && !roles.includes(decoded.role)) return res.status(403).json({message:'Access denied'});
      next();
    } catch (err) {
      return res.status(401).json({message:'Invalid token'});
    }
  };
};
