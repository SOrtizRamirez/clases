import { Router } from 'express';
import type { Request, Response } from "express";
import cron from "node-cron";
import { sendMail } from "../utils/mailer.ts";
import { checkUserExists } from "../middleware/check.user.exist.ts";

const router = Router();

router.post("/programar", checkUserExists, async (req: Request, res: Response) => {
    const { hora } = req.body; // formato "07:04" → hh:mm
    const user = (req as any).user;

    if (!hora || !/^\d{2}:\d{2}$/.test(hora)) {
        return res.status(400).json({ error: "Formato de hora inválido (usa hh:mm)" });
    }

    const [hh, mm] = hora.split(":");

    const task = cron.schedule(`${mm} ${hh} * * *`, async () => {
        await sendMail({
            to: user.email,
            subject: "Recordatorio automático",
            text: `Hola ${user.name}, este es tu correo programado.`,
            html: `<p>Hola <b>${user.name}</b>, este es tu correo programado.</p>`,
        });
        console.log(`✅ Correo enviado a ${user.email} a las ${hora}`);
    });

    res.json({
        message: `Cronjob programado para enviar correo a ${user.email} a las ${hora}`,
    });
});

export default router;
