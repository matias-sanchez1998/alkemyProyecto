import express from "express";
import cors from "cors";
import movementsRoutes from "./src/routes/movements.routes.js";
import './src/config.js'
import { PORT } from "./src/config.js";

const app = express();

const config = {
  application: {
    cors: {
      server: [
        {
          origin: "*", //servidor que deseas que consuma o (*) en caso que sea acceso libre
          credentials: true,
        },
      ],
    },
  },
};
app.use(cors(config.application.cors.server));
app.use(express.json());

app.use("/movements", movementsRoutes);

//middlewares

app.use((req, res, next) => {
  res.status(404).json({
    message: "endpoint not found",
  });
});

app.listen(PORT);
console.log("Conectado " + PORT);
