import express from 'express';

import { addFestivals } from '../controller/addFestivals.js';

const AddFestivalRouter = express.Router();


AddFestivalRouter.post('/add-festivals', addFestivals);

export default AddFestivalRouter;