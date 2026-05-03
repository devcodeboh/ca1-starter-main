'use strict';

import logger from '../utils/logger.js';
import activityStore from '../models/activity-store.js';
import appStore from '../models/app-store.js';
import { uploadedPath } from '../utils/upload.js';

const details = {
  createView(request, response) {

    const category = activityStore.getCategoryByUser(request.params.id, request.user.id);
    const info = appStore.getAppInfo();
    const search = (request.query.search || '').trim();
    const sortBy = request.query.sortBy || 'name';
    const direction = request.query.direction || 'asc';

    if (!category) {
      logger.warn(`Category not found: ${request.params.id}`);
      response.status(404).render('details', {
        title: `${info.appName} | Category Not Found`,
        id: 'dashboard',
        category: null,
      });
      return;
    }

    let activities = [...category.activities];

    if (search) {
      const term = search.toLowerCase();
      activities = activities.filter((activity) => (
        activity.name.toLowerCase().includes(term)
        || activity.country.toLowerCase().includes(term)
        || activity.riskLevel.toLowerCase().includes(term)
        || activity.monitoringStatus.toLowerCase().includes(term)
      ));
    }

    activities.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'desc' ? bValue - aValue : aValue - bValue;
      }

      return direction === 'desc'
        ? String(bValue).localeCompare(String(aValue))
        : String(aValue).localeCompare(String(bValue));
    });

    logger.info(`Details page loading for category: ${category.title}`);
    response.render('details', {
      title: `${info.appName} | ${category.title}`,
      id: 'dashboard',
      user: request.user,
      category: {
        ...category,
        activities,
      },
      search,
      sortBy,
      direction,
    });
  },

  async addActivity(request, response) {
    await activityStore.addActivity(request.params.id, request.user.id, {
      ...request.body,
      image: uploadedPath(request.file),
    });

    logger.info(`Activity added to category: ${request.params.id}`);
    response.redirect(`/dashboard/${request.params.id}`);
  },

  async deleteActivity(request, response) {
    await activityStore.deleteActivity(request.params.id, request.user.id, request.params.activityId);
    logger.info(`Activity deleted: ${request.params.activityId}`);
    response.redirect(`/dashboard/${request.params.id}`);
  },

  showEditActivity(request, response) {
    const info = appStore.getAppInfo();
    const category = activityStore.getCategoryByUser(request.params.id, request.user.id);
    const activity = activityStore.getActivityByUser(
      request.params.id,
      request.user.id,
      request.params.activityId
    );

    if (!category || !activity) {
      response.redirect('/dashboard');
      return;
    }

    response.render('edit-activity', {
      title: `${info.appName} | Edit ${activity.name}`,
      id: 'dashboard',
      user: request.user,
      category,
      activity,
    });
  },

  async updateActivity(request, response) {
    await activityStore.updateActivity(request.params.id, request.user.id, request.params.activityId, {
      ...request.body,
      image: uploadedPath(request.file),
    });

    logger.info(`Activity updated: ${request.params.activityId}`);
    response.redirect(`/dashboard/${request.params.id}`);
  },
};

export default details;
