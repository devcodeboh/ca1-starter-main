'use strict';

import logger from '../utils/logger.js';
import appStore from '../models/app-store.js';

const welcome = {
  createView(request, response) {
    // Load app-level presentation content from JSON for the homepage.
    const info = appStore.getAppInfo();
    logger.info('Welcome page loading');

    response.render('welcome', {
      title: `${info.appName} | Welcome`,
      id: 'welcome',
      info,
    });
  },
};

export default welcome;
