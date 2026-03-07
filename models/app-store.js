'use strict';

import JsonStore from './json-store.js';

const appStore = {
  store: new JsonStore('./models/app-store.json', { info: {} }),
  collection: 'info',

  getAppInfo() {
    return this.store.findAll(this.collection);
  },

  getAuthorInfo() {
    return this.getAppInfo().author;
  },

  getStaticStats() {
    return this.getAppInfo().statistics;
  },

  getProjectNotes() {
    return this.getAppInfo().projectNotes;
  },
};

export default appStore;
