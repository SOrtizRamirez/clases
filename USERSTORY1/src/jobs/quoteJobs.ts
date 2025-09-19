import cron from "node-cron";
import quotes from "../data/quotes.json" with { type: "json" };
import { sendMail } from "../utils/mailer.ts";

export function scheduleQuoteEmail(user: any, hora: string) {
    const [hh, mm] = hora.split(":");

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    cron.schedule(`${mm} ${hh} * * *`, async () => {
        const randomQuote = quotes.length > 0
            ? quotes[Math.floor(Math.random() * quotes.length)]
            : null;

        if (!randomQuote) {
            console.warn("No hay frases en quotes.json");
            return;
        }

        await sendMail({
            to: user.email,
            subject: "Tu frase del día",
            text: randomQuote.phrase,
            html: `<blockquote>${randomQuote.phrase}</blockquote>`,
        });
        console.log(`✅ Correo enviado a ${user.email} con frase: ${randomQuote.phrase}`);
    });
}
