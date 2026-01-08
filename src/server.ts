import app from "./app";
import AppDataSource from "./config/datasource";

const PORT_DEFAULT = 3000;

const startServer = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Se ha conectado a la base de datos");

        app.listen(PORT_DEFAULT, '0.0.0.0', () => {
            console.log(`Servidor corriendo en puerto ${PORT_DEFAULT}`);
        });
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
        process.exit(1);
    }
};

startServer();
