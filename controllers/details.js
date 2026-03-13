'use strict';

import logger from '../utils/logger.js';
import activityStore from '../models/activity-store.js';
import appStore from '../models/app-store.js';

const details = {
  createView(request, response) {

    const category = activityStore.getCategoryById(request.params.id);
    const info = appStore.getAppInfo();

    if (!category) {
      logger.warn(`Category not found: ${request.params.id}`);
      response.status(404).render('details', {
        title: `${info.appName} | Category Not Found`,
        id: 'dashboard',
        category: null,
      });
      return;
    }

    logger.info(`Details page loading for category: ${category.title}`);
    response.render('details', {
      title: `${info.appName} | ${category.title}`,
      id: 'dashboard',
      category,
    });
  },
};

export default details;
