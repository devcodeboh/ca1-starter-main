'use strict';

import express from 'express';
import logger from './utils/logger.js';
import welcome from './controllers/welcome.js';
import dashboard from './controllers/dashboard.js';
import details from './controllers/details.js';
import about from './controllers/about.js';
import safety from './controllers/safety.js';
import accounts from './controllers/accounts.js';
import upload from './utils/upload.js';
import { attachUser, requireUser } from './utils/auth.js';

const router = express.Router();

router.use(attachUser);

router.get('/', welcome.createView);
router.get('/signup', accounts.showSignup);
router.post('/signup', upload.single('profileImage'), accounts.signup);
router.get('/login', accounts.showLogin);
router.post('/login', accounts.login);
router.get('/logout', accounts.logout);

router.get('/dashboard', requireUser, dashboard.createView);
router.get('/dashboard/:id', requireUser, details.createView);
router.get('/about', about.createView);
router.get('/safety', safety.createView);

router.use((request, response) => {
  logger.warn(`404 on route: ${request.originalUrl}`);
  response.status(404).send('Page not found');
});

export default router;
