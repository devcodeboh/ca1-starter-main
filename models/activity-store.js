'use strict';

import crypto from 'crypto';
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

  async addCategory(userId, categoryData) {
    const category = {
      id: crypto.randomUUID(),
      userId,
      title: categoryData.title.trim(),
      image: categoryData.image || '/images/volcano-hero.svg',
      imageAlt: `${categoryData.title.trim()} collection image`,
      activities: [],
      createdAt: new Date().toISOString(),
    };

    await this.store.addCollection(this.collection, category);
    return category;
  },

  async deleteCategory(id, userId) {
    const category = this.getCategoryByUser(id, userId);

    if (category) {
      await this.store.removeCollection(this.collection, category);
    }
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
