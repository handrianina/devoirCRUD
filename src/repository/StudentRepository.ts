import { pool } from "../db";

export class EtudiantRepository {

    async findAll() {
        const result = await pool.query(
            "SELECT * FROM etudiants"
        );

        return result.rows;
    }

    async findById(id: number) {
        const result = await pool.query(
            "SELECT * FROM etudiants WHERE id = $1",
            [id]
        );

        return result.rows[0];
    }

    async create(first_name: string, last_name: string, age: number) {
        const result = await pool.query(
            `INSERT INTO etudiants 
            (first_name, last_name, age) 
            VALUES ($1, $2, $3) 
            RETURNING *`,
            [first_name, last_name, age]
        );

        return result.rows[0];
    }

    async update(
        id: number,
        first_name: string,
        last_name: string,
        age: number
    ) {
        const result = await pool.query(
            `UPDATE etudiants 
             SET first_name = $1, 
                 last_name = $2, 
                 age = $3 
             WHERE id = $4 
             RETURNING *`,
            [first_name, last_name, age, id]
        );

        return result.rows[0];
    }

    async patch(
        id: number,
        first_name?: string,
        last_name?: string,
        age?: number
    ) {
        const result = await pool.query(
            `UPDATE etudiants
             SET first_name = COALESCE($1, first_name),
                 last_name = COALESCE($2, last_name),
                 age = COALESCE($3, age)
             WHERE id = $4
             RETURNING *`,
            [first_name, last_name, age, id]
        );

        return result.rows[0];
    }

    async delete(id: number) {
        const result = await pool.query(
            `DELETE FROM etudiants
             WHERE id = $1
             RETURNING *`,
            [id]
        );

        return result.rows[0];
    }
}