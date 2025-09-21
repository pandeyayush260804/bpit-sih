import { verifyToken } from "../services/token.js";

export const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // <-- standard header
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized User - No token" });
  }

  const token = authHeader.split(" ")[1]; // Expect "Bearer <token>"
  if (!token) {
    return res.status(401).json({ message: "Unauthorized User - Invalid format" });
  }

  try {
    const decoded = verifyToken(token); // verifyToken should return payload (email, role, etc.)
    req.user = decoded; // attach payload for later use
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized User - Invalid token" });
  }
};
