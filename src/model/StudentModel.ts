import { pool } from "../controller/StudentController.js";

export interface Student {
    id: number;
    name: string;
    firstName: string;
    email: string;
    age: number;
    formation: string;
}

//GET all student 

export const getAllStudent = async () => {
    const result = await pool.query(
        "SELECT * FROM students ORDER BY id"
    );
    return result.rows;
};


// GET one student 
export const getStudentById = async (id: number) => {
    const result = await pool.query(
        "SELECT * FROM students WHERE id = $1",
        [id]
    );
    return result.rows[0];
};

// POST 
export const creatStudent = async (student : Student) => {
    const result = await pool.query(
        `INSERT INTO students (name, first_name, email, age, formation)
        VALUES ($1, $2, $3, $4, $5)
        RETURNUNG *`,
        [
            student.name,
            student.firstName,
            student.email,
            student.age,
            student.formation
        ]
    );
    return result.rows[0];

};

// PUT 
export const updateStudent = async (
    id: number,
    student : Student
) => {

    const result = await pool.query(
        `UPDATE students 
        SET name = $1,
            firstName = $2,
            email = $3,
            age = $4,
            formation = $5,
        WHERE id = $6
        RETURNING *`,
        [
            student.name,
            student.firstName,
            student.email,
            student.age,
            student.formation,
            id
        ]
    );
    return result.rows[0];
};

// PATCH 
export const patchStudent = async (
    id: number,
    data: Partial<Student>
) => {
    const fields = Object.keys(data);

    if (fields.length === 0 ){
        return null;
    }

    const values =
    Object.values(data);

    const setClause = fields 
        .map((field , index ) => `${field} = $${index + 1}`)
        .join(" ,");
    
    const result = await pool.query(
        `UPDATE students 
         SET ${setClause} 
         WHERE id = $${values.length + 1 }
         RETURNING *`,
         [ ... values, id]
    );

    return result.rows[0];
};


// DETETE
 export const deleteStudent = async (id : number ) => {
    const result = await pool.query(
        "DELETE FROM students WHERE id = $1 RETURNING *",
        [id]
    );
    return result.rows[0];
 };