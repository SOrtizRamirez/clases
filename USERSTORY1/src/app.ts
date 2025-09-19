import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import mailRoutes from "./routes/mail.routes.ts";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Ruta de correos
app.use("/mail", mailRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`);
});
