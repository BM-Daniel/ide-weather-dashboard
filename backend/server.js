import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './router/router.js';


const app = express();


// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

const port = 8080;

// main route
app.get('/', (req, res) => {
    return res.status(201).json("Hello world");
})


/* api routes */
app.use('/api', router);

app.listen(port, () => {
    console.log(`Server connected to http://localhost:${port}`);
})
