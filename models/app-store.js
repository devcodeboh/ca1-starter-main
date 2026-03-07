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

  getMapInfo() {
    const info = this.getAppInfo();
    return {
      image: info.mapImage,
      alt: info.mapImageAlt,
    };
  },

  getStaticStats() {
    return this.getAppInfo().statistics;
  },
};

export default appStore;
