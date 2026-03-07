'use strict';

import JsonStore from './json-store.js';

const activityStore = {
  store: new JsonStore('./models/activity-store.json', { activityCollection: [] }),
  collection: 'activityCollection',

  getAllCategories() {
    return this.store.findAll(this.collection);
  },

  getCategoryById(id) {
    return this.store.findOneBy(this.collection, (category) => category.id === id);
  },

  getStats() {
    const categories = this.getAllCategories();
    const totalActivities = categories.reduce((sum, category) => sum + category.activities.length, 0);

    return {
      categories: categories.length,
      activities: totalActivities,
      monitoredContinuously: categories
        .flatMap((category) => category.activities)
        .filter((item) => item.monitoringStatus === 'Continuous').length,
    };
  },
};

export default activityStore;
