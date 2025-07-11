const jwt = require("jsonwebtoken");
const jwt_Token = process.env.JWT_SECRET; 

function authMiddleware(req, res, next) {
  const token = req.headers.authorization; 
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, "1234");
   
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = authMiddleware;
