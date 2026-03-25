import jwt from 'jsonwebtoken';

export async function authMiddleware(req, res, next) {

  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(403).json({ message: "Access denined. No token provided" })
    }

    token = token.split(' ').pop().trim()

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;


    next();

  } catch (err) {
    console.log("Auth Error:", err.message)
    res.status(400).json({ message: err.message })
  }
}

export default authMiddleware;