import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
    definition:{
        openapi:'3.0.0',
        info:{
            title:"Phone Inventory Swagger",
            version:"1.0.0",
            description:"A simple Express Api with swagger documentation."
        },
        servers: [
            {
                url: 'http://localhost:8080/api/v1'
            },
        ],
    },
    apis:[path.join(__dirname, './routes/*.js')]
}


const swaggerDocs  = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi };