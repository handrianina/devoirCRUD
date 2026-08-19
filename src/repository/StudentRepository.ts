import { pool } from "../config/DB.js";
import type { Student } from "../model/StudentModel.js";

export class StudentRepository {
  async findByEmail(email: string): Promise<Student | null> {
    const query = "SELECT * FROM students WHERE email = $1";
    const result = await pool.query(query, [email]);
    
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }
}