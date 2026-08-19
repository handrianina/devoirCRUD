import { Request, Response } from "express";
import { generateToken } from "../middleware/authMiddleware.js";

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: "Identifiants manquants" });
      }

      // À remplacer par une vérification réelle en BD avec hashage de mot de passe
      if (username === "admin" && password === "admin123") {
        const token = generateToken("admin-user-id");
        return res.json({ token, message: "Connexion réussie" });
      }

      res.status(401).json({ error: "Identifiants invalides" });
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
}