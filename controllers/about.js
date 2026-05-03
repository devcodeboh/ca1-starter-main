'use strict';

import logger from '../utils/logger.js';
import appStore from '../models/app-store.js';
import activityStore from '../models/activity-store.js';
import userStore from '../models/user-store.js';

const about = {
  createView(request, response) {

    const info = appStore.getAppInfo();
    const author = appStore.getAuthorInfo();
    const staticStats = appStore.getStaticStats();
    const projectNotes = appStore.getProjectNotes();
    const map = appStore.getMapInfo();
    const users = userStore.getAllUsers();
    const collectionStats = activityStore.getStats();
    const currentUserStats = request.user ? activityStore.getStats(request.user.id) : null;
    const topCollector = activityStore.getUserWithMostCollections(users);

    logger.info('About page loading');

    response.render('about', {
      title: `${info.appName} | About`,
      id: 'about',
      user: request.user,
      author,
      staticStats,
      projectNotes,
      map,
      collectionStats,
      userCount: users.length,
      topCollector,
      currentUserStats,
    });
  },
};

export default about;
