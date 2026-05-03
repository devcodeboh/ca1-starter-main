'use strict';

import logger from '../utils/logger.js';
import appStore from '../models/app-store.js';
import userStore from '../models/user-store.js';
import { uploadedPath } from '../utils/upload.js';

function viewData(request, extra = {}) {
  const info = appStore.getAppInfo();
  return {
    title: `${info.appName} | Account`,
    appName: info.appName,
    id: extra.id || 'account',
    user: request.user,
    ...extra,
  };
}

const accounts = {
  showSignup(request, response) {
    response.render('signup', viewData(request, { id: 'signup' }));
  },

  async signup(request, response) {
    const { firstName, lastName, email, password } = request.body;
    const passwordErrors = userStore.validatePassword(password);

    if (!firstName || !lastName || !email || passwordErrors.length > 0) {
      response.status(400).render('signup', viewData(request, {
        id: 'signup',
        error: 'Please complete all fields and follow the password rules.',
        passwordErrors,
        form: request.body,
      }));
      return;
    }

    if (userStore.getUserByEmail(email)) {
      response.status(400).render('signup', viewData(request, {
        id: 'signup',
        error: 'An account already exists for this email address.',
        form: request.body,
      }));
      return;
    }

    const user = await userStore.addUser({
      firstName,
      lastName,
      email,
      password,
      profileImage: uploadedPath(request.file),
    });

    request.session.userId = user.id;
    logger.info(`New user signed up: ${user.email}`);
    response.redirect('/dashboard');
  },

  showLogin(request, response) {
    response.render('login', viewData(request, { id: 'login' }));
  },

  login(request, response) {
    const user = userStore.authenticate(request.body.email || '', request.body.password || '');

    if (!user) {
      response.status(401).render('login', viewData(request, {
        id: 'login',
        error: 'Email and password do not match.',
        form: request.body,
      }));
      return;
    }

    request.session.userId = user.id;
    logger.info(`User logged in: ${user.email}`);
    response.redirect('/dashboard');
  },

  logout(request, response) {
    request.session.destroy(() => response.redirect('/'));
  },

  showProfile(request, response) {
    response.render('profile', viewData(request, { id: 'profile' }));
  },

  async updateProfileImage(request, response) {
    await userStore.updateProfileImage(request.user.id, uploadedPath(request.file));
    response.redirect('/profile');
  },
};

export default accounts;
