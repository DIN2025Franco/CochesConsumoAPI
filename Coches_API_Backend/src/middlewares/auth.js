import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'mi_secreto_super_seguro';

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    const error = new Error('No se proporcionó un token de acceso');
    error.status = 403;
    return next(error);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    const error = new Error('Token inválido o expirado');
    error.status = 401;
    return next(error);
  }
};
