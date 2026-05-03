'use strict';

import logger from '../utils/logger.js';
import appStore from '../models/app-store.js';
import activityStore from '../models/activity-store.js';
import userStore from '../models/user-store.js';

const welcome = {
  createView(request, response) {

    const info = appStore.getAppInfo();
    const appStats = activityStore.getStats();
    logger.info('Welcome page loading');

    response.render('welcome', {
      title: `${info.appName} | Welcome`,
      id: 'welcome',
      user: request.user,
      info,
      appStats: {
        ...appStats,
        users: userStore.getAllUsers().length,
      },
    });
  },
};

export default welcome;
