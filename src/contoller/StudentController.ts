import { Request, Response } from "express";
import { EtudiantService } from "../service/etudiant.service";

export class EtudiantController {

    private service = new EtudiantService();

    async getAll(req: Request, res: Response) {
        try {
            const etudiants = await this.service.getAll();

            res.status(200).json(etudiants);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: "Erreur serveur"
            });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const etudiant = await this.service.getById(id);

            res.status(200).json(etudiant);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: "Erreur serveur"
            });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const {
                first_name,
                last_name,
                age
            } = req.body;

            const etudiant = await this.service.create(
                first_name,
                last_name,
                age
            );

            res.status(201).json(etudiant);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: "Erreur serveur"
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const {
                first_name,
                last_name,
                age
            } = req.body;

            const etudiant = await this.service.update(
                id,
                first_name,
                last_name,
                age
            );

            res.status(200).json(etudiant);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: "Erreur serveur"
            });
        }
    }

    async patch(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const {
                first_name,
                last_name,
                age
            } = req.body;

            const etudiant = await this.service.patch(
                id,
                first_name,
                last_name,
                age
            );

            res.status(200).json(etudiant);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: "Erreur serveur"
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const etudiant = await this.service.delete(id);

            res.status(200).json({
                message: "Étudiant supprimé",
                etudiant: etudiant
            });

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: "Erreur serveur"
            });
        }
    }
}