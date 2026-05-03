'use strict';

import logger from '../utils/logger.js';
import appStore from '../models/app-store.js';
import activityStore from '../models/activity-store.js';
import { uploadedPath } from '../utils/upload.js';

const dashboard = {
  createView(request, response) {

    const search = (request.query.search || '').trim();
    const sortBy = request.query.sortBy || 'title';
    const direction = request.query.direction || 'asc';
    let categories = activityStore.getCategoriesByUserId(request.user.id);
    const info = appStore.getAppInfo();

    if (search) {
      const term = search.toLowerCase();
      categories = categories.filter((category) => category.title.toLowerCase().includes(term));
    }

    categories = [...categories].sort((a, b) => {
      const aValue = sortBy === 'items' ? a.activities.length : a.title;
      const bValue = sortBy === 'items' ? b.activities.length : b.title;

      if (typeof aValue === 'number') {
        return direction === 'desc' ? bValue - aValue : aValue - bValue;
      }

      return direction === 'desc'
        ? String(bValue).localeCompare(String(aValue))
        : String(aValue).localeCompare(String(bValue));
    });
    logger.info('Dashboard page loading');

    response.render('dashboard', {
      title: `${info.appName} | Dashboard`,
      id: 'dashboard',
      appName: info.appName,
      user: request.user,
      categories,
      search,
      sortBy,
      direction,
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
