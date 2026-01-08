"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*import app from "./app";
import AppDataSource from "./config/datasource";

const PORT_DEFAULT = 3000;

app.listen(PORT_DEFAULT,'0.0.0.0', async () => {
    console.log(`El servidor se esta ejecutando en el puerto ${PORT_DEFAULT}`);
    await AppDataSource.initialize();
    console.log('Se ha conectado a la base de datos');
} );
*/
const app_1 = __importDefault(require("./app"));
const datasource_1 = __importDefault(require("./config/datasource"));
const PORT_DEFAULT = 3000;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield datasource_1.default.initialize();
        console.log("Se ha conectado a la base de datos");
        app_1.default.listen(PORT_DEFAULT, '0.0.0.0', () => {
            console.log(`Servidor corriendo en puerto ${PORT_DEFAULT}`);
        });
    }
    catch (error) {
        console.error("Error al conectar a la base de datos:", error);
        process.exit(1);
    }
});
startServer();
//# sourceMappingURL=server.js.map