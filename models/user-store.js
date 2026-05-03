'use strict';

import crypto from 'crypto';
import JsonStore from './json-store.js';

function hashPassword(password, salt) {
  return crypto.createHash('sha256').update(`${password}${salt}`).digest('hex');
}

function validatePassword(password) {
  const errors = [];

  if (!password || password.length < 8) {
    errors.push('Password must be at least 8 characters.');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must include an uppercase letter.');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must include a lowercase letter.');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must include a number.');
  }

  return errors;
}

const userStore = {
  store: new JsonStore('./models/user-store.json', { users: [] }),
  collection: 'users',

  getAllUsers() {
    return this.store.findAll(this.collection);
  },

  getUserById(id) {
    return this.store.findOneBy(this.collection, (user) => user.id === id);
  },

  getUserByEmail(email) {
    return this.store.findOneBy(
      this.collection,
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  },

  validatePassword,

  async addUser(userData) {
    const passwordSalt = crypto.randomUUID();
    const user = {
      id: crypto.randomUUID(),
      firstName: userData.firstName.trim(),
      lastName: userData.lastName.trim(),
      email: userData.email.trim().toLowerCase(),
      passwordSalt,
      passwordHash: hashPassword(userData.password, passwordSalt),
      profileImage: userData.profileImage || '/images/volcano-hero.svg',
      createdAt: new Date().toISOString(),
    };

    await this.store.addCollection(this.collection, user);
    return user;
  },

  authenticate(email, password) {
    const user = this.getUserByEmail(email);

    if (!user) {
      return null;
    }

    const hash = hashPassword(password, user.passwordSalt);
    return hash === user.passwordHash ? user : null;
  },
};

export default userStore;
