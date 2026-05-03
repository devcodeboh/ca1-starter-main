'use strict';

import fs from 'fs';

function clone(data) {
  return JSON.parse(JSON.stringify(data));
}

class JsonStore {
  constructor(file, defaults) {
    this.file = file;
    this.defaults = defaults;
    this.data = this.read();
  }

  read() {
    if (!fs.existsSync(this.file)) {
      fs.writeFileSync(this.file, JSON.stringify(this.defaults, null, 2));
      return clone(this.defaults);
    }

    const content = fs.readFileSync(this.file, 'utf-8');
    return content ? JSON.parse(content) : clone(this.defaults);
  }

  write() {
    fs.writeFileSync(this.file, JSON.stringify(this.data, null, 2));
  }

  findAll(collection) {
    return this.data[collection];
  }

  findBy(collection, filter) {
    const results = this.data[collection].filter(filter);
    return results;
  }

  findOneBy(collection, filter) {
    const results = this.data[collection].filter(filter);
    return results[0];
  }

  async addCollection(collection, obj) {
    this.data[collection].push(obj);
    this.write();
  }

  async addItem(collection, id, arr, obj) {
    const data = this.data[collection].filter((c) => c.id === id);
    data[0][arr].push(obj);
    this.write();
  }

  async removeCollection(collection, obj) {
    const index = this.data[collection].indexOf(obj);
    if (index > -1) {
      this.data[collection].splice(index, 1);
    }
    this.write();
  }

  async removeItem(collection, id, arr, itemId) {
    const data = this.data[collection].filter((c) => c.id === id);
    const item = data[0][arr].filter((i) => i.id === itemId);
    const index = data[0][arr].indexOf(item[0]);
    if (index > -1) {
      data[0][arr].splice(index, 1);
    }
    this.write();
  }

  async editCollection(collection, id, obj) {
    let index = this.data[collection].findIndex((c) => c.id === id);
    if (index > -1) {
      this.data[collection].splice(index, 1, obj);
    }
    this.write();
  }

  async editItem(collection, id, itemId, arr, obj) {
    const data = this.data[collection].filter((c) => c.id === id);
    let index = data[0][arr].findIndex((i) => i.id === itemId);
    data[0][arr].splice(index, 1, obj);
    this.write();
  }
}

export default JsonStore;
