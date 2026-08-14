import { EtudiantRepository } from "../repository/etudiant.repository.";

export class EtudiantService {

    private repository = new EtudiantRepository();

    async getAll() {
        return await this.repository.findAll();
    }

    async getById(id: number) {
        return await this.repository.findById(id);
    }

    async create(
        first_name: string,
        last_name: string,
        age: number
    ) {
        return await this.repository.create(
            first_name,
            last_name,
            age
        );
    }

    async update(
        id: number,
        first_name: string,
        last_name: string,
        age: number
    ) {
        return await this.repository.update(
            id,
            first_name,
            last_name,
            age
        );
    }

    async patch(
        id: number,
        first_name?: string,
        last_name?: string,
        age?: number
    ) {
        return await this.repository.patch(
            id,
            first_name,
            last_name,
            age
        );
    }

    async delete(id: number) {
        return await this.repository.delete(id);
    }
}