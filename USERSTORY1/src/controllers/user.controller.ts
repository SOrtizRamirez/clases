import type { Request, Response } from "express";
import { getUserByMailService } from "../services/user.service.ts";
import { scheduleQuoteEmail } from "../jobs/quoteJobs.ts";

export async function programarCorreo(req: Request, res: Response) {
    try {
        const { mail, hora } = req.body;

        if (!mail || !hora) {
            return res.status(400).json({ error: "Debes enviar 'mail' y 'hora' en el body" });
        }

        const user = await getUserByMailService(mail);

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // 👉 Aquí ya usas tu quoteJobs.ts
        scheduleQuoteEmail(user, hora);

        res.json({
            message: `Cronjob programado para ${hora} y correo a ${user.email}`,
        });
    } catch (err) {
        console.error("Error en programarCorreo:", err);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}
