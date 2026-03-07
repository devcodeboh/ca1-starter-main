'use strict';

import logger from '../utils/logger.js';
import appStore from '../models/app-store.js';
import activityStore from '../models/activity-store.js';

const about = {
  createView(request, response) {
    // Compose about-page data from both static JSON and computed collection totals.
    const info = appStore.getAppInfo();
    const author = appStore.getAuthorInfo();
    const map = appStore.getMapInfo();
    const staticStats = appStore.getStaticStats();
    const collectionStats = activityStore.getStats();

    logger.info('About page loading');

    response.render('about', {
      title: `${info.appName} | About`,
      id: 'about',
      author,
      map,
      staticStats,
      collectionStats,
    });
  },
};

export default about;
