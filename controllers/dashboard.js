'use strict';

import logger from '../utils/logger.js';
import appStore from '../models/app-store.js';
import activityStore from '../models/activity-store.js';

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
};

export default dashboard;
