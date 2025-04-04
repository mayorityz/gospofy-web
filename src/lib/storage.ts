export enum STORAGE_KEY {
  TOKEN = "_t__t__sopfy",
  ADMINTOKEN = "_at_t_sopfy",
  EMAIL = "email",
}

class LocalStorage {
  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  setItem(key: STORAGE_KEY, value: string) {
    this.storage.setItem(key, value);
  }

  read(key: STORAGE_KEY): string | null {
    return this.storage.getItem(key);
  }

  removeItem(key: STORAGE_KEY) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }
}

export default LocalStorage;
