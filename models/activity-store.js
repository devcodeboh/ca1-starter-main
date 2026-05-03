'use strict';

import JsonStore from './json-store.js';

const activityStore = {
  store: new JsonStore('./models/activity-store.json', { activityCollection: [] }),
  collection: 'activityCollection',

  getAllCategories() {
    return this.store.findAll(this.collection);
  },

  getCategoriesByUserId(userId) {
    return this.store.findBy(this.collection, (category) => category.userId === userId);
  },

  getCategoryById(id) {
    return this.store.findOneBy(this.collection, (category) => category.id === id);
  },

  getCategoryByUser(id, userId) {
    return this.store.findOneBy(
      this.collection,
      (category) => category.id === id && category.userId === userId
    );
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
