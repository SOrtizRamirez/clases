import type { Request, Response, NextFunction } from "express";
import users from "../data/users.json" with { type: "json" };

export async function checkUserExists(req: Request, res: Response, next: NextFunction) {
    const { mail } = req.body;

    if (!mail) {
        return res.status(400).json({ error: "El campo 'mail' es obligatorio" });
    }

    const user = users.find((u) => u.email === mail);

    if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Guardamos el usuario en la request para usarlo en el controlador
    (req as any).user = user;

    next();
}
