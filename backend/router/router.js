import { Router } from "express";
const router = Router();

//Controllers
import * as  controller from '../controller/weatherController.js';

// GET METHOD
router.get('/weather/:location', controller.getCurrentWeather);

export default router;