'use strict';

import logger from '../utils/logger.js';
import appStore from '../models/app-store.js';
import userStore from '../models/user-store.js';
import { uploadedPath } from '../utils/upload.js';

const accounts = {
  showSignup(request, response) {
    const info = appStore.getAppInfo();

    response.render('signup', {
      title: `${info.appName} | Signup`,
      id: 'signup',
      user: request.user,
    });
  },

  async signup(request, response) {
    const info = appStore.getAppInfo();
    const { firstName, lastName, email, password } = request.body;
    const passwordErrors = userStore.validatePassword(password);

    // Simple checks for the signup form.
    if (!firstName || !lastName || !email || passwordErrors.length > 0) {
      response.status(400).render('signup', {
        title: `${info.appName} | Signup`,
        id: 'signup',
        user: request.user,
        error: 'Please fill in all fields and check the password rules.',
        passwordErrors,
        form: request.body,
      });
      return;
    }

    // Do not allow two accounts with the same email.
    if (userStore.getUserByEmail(email)) {
      response.status(400).render('signup', {
        title: `${info.appName} | Signup`,
        id: 'signup',
        user: request.user,
        error: 'An account already exists for this email address.',
        form: request.body,
      });
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
    const info = appStore.getAppInfo();

    response.render('login', {
      title: `${info.appName} | Login`,
      id: 'login',
      user: request.user,
    });
  },

  login(request, response) {
    const info = appStore.getAppInfo();
    const user = userStore.authenticate(request.body.email || '', request.body.password || '');

    if (!user) {
      response.status(401).render('login', {
        title: `${info.appName} | Login`,
        id: 'login',
        user: request.user,
        error: 'Email and password do not match.',
        form: request.body,
      });
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
    const info = appStore.getAppInfo();

    response.render('profile', {
      title: `${info.appName} | Profile`,
      id: 'profile',
      user: request.user,
    });
  },

  async updateProfileImage(request, response) {
    await userStore.updateProfileImage(request.user.id, uploadedPath(request.file));
    response.redirect('/profile');
  },
};

export default accounts;
