import jwt from "jsonwebtoken";
import { StudentRepository } from "../repository/StudentRepository.js";

export class AuthService {
  private studentRepo = new StudentRepository();

  async login(email: string, passwordCandidat: string) {
    const student = await this.studentRepo.findByEmail(email);

    if (!student) {
      throw new Error("Identifiants invalides");
    }

    if (student.password !== passwordCandidat) {
      throw new Error("Identifiants invalides");
    }

    // generating token
    const token = jwt.sign(
      { id: student.id }, 
      process.env.JWT_SECRET || "secret", 
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    return { token, message: "Connexion réussie" };
  }
}