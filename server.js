import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './router/router.js';
import path from 'path';
import { fileURLToPath } from 'url';

// api swagger documentation
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));


// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

const port = 8080;

/* swagger docs configuration */
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "API Endpoints",
            version: '5.0.0'
        }
    },
    apis: ['server.js'],
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);
// route for swagger docs
router.use('/docs', swaggerUiExpress.serve,swaggerUiExpress.setup(swaggerDocs));


/* api documenation for swagger site */
//Get user
/**
 * @swagger
 * /api/weather/{location}:
 *   get:
 *     tags:
 *     - Weather Details
 *     description: Get user's weather information by location
 *     parameters:
 *       - name: location
 *         description: Enter location
 *         in: path
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: User not found
 */

// main route
app.get('/', (req, res) => {
    return res.status(201).json("Hello world");
})


// static files
app.use(express.static(path.join('public')));

app.get('/landing-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/landing-page.html'));
});

app.get('/insights', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/insights.html'));
});

app.get('/not-found', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/not-found.html'));
});


/* api routes */
app.use('/api', router);

app.listen(port, () => {
    console.log(`Server connected to http://localhost:${port}`);
})
