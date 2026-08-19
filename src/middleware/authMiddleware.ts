import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token manquant" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as { id: string };
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(403).json({ error: "Token invalide" });
  }
};

export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || "secret", {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};