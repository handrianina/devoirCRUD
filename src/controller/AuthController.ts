import type { Request, Response } from "express";
import { AuthService } from "../service/AuthService.js";

export class AuthController {
  private authService = new AuthService();

  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Identifiants manquants" });
        return;
      }

      const result = await this.authService.login(email, password);
      res.json(result);

    } catch (error: any) {
      if (error.message === "Identifiants invalides") {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Erreur serveur" });
      }
    }
  }
}