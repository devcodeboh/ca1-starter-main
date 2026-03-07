'use strict';

import express from 'express';
import logger from './utils/logger.js';
import welcome from './controllers/welcome.js';
import dashboard from './controllers/dashboard.js';
import details from './controllers/details.js';
import about from './controllers/about.js';
import safety from './controllers/safety.js';

const router = express.Router();

router.get('/', welcome.createView);
router.get('/dashboard', dashboard.createView);
router.get('/dashboard/:id', details.createView);
router.get('/about', about.createView);
router.get('/safety', safety.createView);

router.use((request, response) => {
  logger.warn(`404 on route: ${request.originalUrl}`);
  response.status(404).send('Page not found');
});

export default router;
