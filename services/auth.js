import * as storage from './securestorage.js';

export default class Auth {
  static saveCredentials = async (credentials) => {
    await storage.save('credentials', JSON.stringify(credentials));
  }

  static getCredentials = async () => {
    var credentialsStr = await storage.getValueFor('credentials');
    if (credentialsStr) {
      return JSON.parse(credentialsStr);
    } else {
      return null;
    }
  }

  static isAuthed = async () => {
    var credentials = await this.getCredentials();
    if (credentials && (credentials.token || (credentials.username && credentials.password))) {
      return true;
    } else {
      return false;
    }
  }

  static deleteCredentials = async () => {
    storage.deleteValue('credentials');
  }
}