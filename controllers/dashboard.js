'use strict';

import logger from '../utils/logger.js';
import appStore from '../models/app-store.js';
import activityStore from '../models/activity-store.js';
import { uploadedPath } from '../utils/upload.js';

const dashboard = {
  createView(request, response) {

    const categories = activityStore.getCategoriesByUserId(request.user.id);
    const info = appStore.getAppInfo();
    logger.info('Dashboard page loading');

    response.render('dashboard', {
      title: `${info.appName} | Dashboard`,
      id: 'dashboard',
      appName: info.appName,
      user: request.user,
      categories,
    });
  },

  async addCategory(request, response) {
    if (!request.body.title || !request.body.title.trim()) {
      response.redirect('/dashboard');
      return;
    }

    await activityStore.addCategory(request.user.id, {
      title: request.body.title,
      image: uploadedPath(request.file),
    });

    logger.info(`Category added by ${request.user.email}: ${request.body.title}`);
    response.redirect('/dashboard');
  },

  async deleteCategory(request, response) {
    await activityStore.deleteCategory(request.params.id, request.user.id);
    logger.info(`Category deleted: ${request.params.id}`);
    response.redirect('/dashboard');
  },
};

export default dashboard;
