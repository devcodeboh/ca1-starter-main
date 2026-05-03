'use strict';

import userStore from '../models/user-store.js';

export function attachUser(request, response, next) {
  request.user = request.session.userId ? userStore.getUserById(request.session.userId) : null;
  response.locals.user = request.user;
  next();
}

export function requireUser(request, response, next) {
  if (!request.user) {
    response.redirect('/login');
    return;
  }

  next();
}
