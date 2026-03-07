'use strict';

import logger from '../utils/logger.js';
import appStore from '../models/app-store.js';
import activityStore from '../models/activity-store.js';

const about = {
  createView(request, response) {
    // combine static app info with live counts from collection
    const info = appStore.getAppInfo();
    const author = appStore.getAuthorInfo();
    const staticStats = appStore.getStaticStats();
    const projectNotes = appStore.getProjectNotes();
    const map = appStore.getMapInfo();
    const collectionStats = activityStore.getStats();

    logger.info('About page loading');

    response.render('about', {
      title: `${info.appName} | About`,
      id: 'about',
      author,
      staticStats,
      projectNotes,
      map,
      collectionStats,
    });
  },
};

export default about;
