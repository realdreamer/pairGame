'use strict';
import _ from 'lodash';

export default class Store {
  constructor () {
    this.sessionStorage = window.sessionStorage;
  }

  getSessionStorage (key) {
    return this.sessionStorage.getItem(key);
  }

  setSessionStorage (key, value) {
    return this.sessionStorage.setItem(key, value);
  }

  clearProp ( name ) {
    if (name) {
      this.sessionStorage.removeItem(name);
    }
    else {
      throw new Error('Unable to remove item. Please specify the itemKey');
    }
  }

  clearSessionStorage () {
    this.sessionStorage.clear();
  }
}
