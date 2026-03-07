'use strict';

import logger from '../utils/logger.js';
import appStore from '../models/app-store.js';
import activityStore from '../models/activity-store.js';

const dashboard = {
  createView(request, response) {
    // Show category titles only. Item details are intentionally hidden on this page.
    const categories = activityStore.getAllCategories();
    const info = appStore.getAppInfo();
    logger.info('Dashboard page loading');

    response.render('dashboard', {
      title: `${info.appName} | Dashboard`,
      id: 'dashboard',
      appName: info.appName,
      categories,
    });
  },
};

export default dashboard;
