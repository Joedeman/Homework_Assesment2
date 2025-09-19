import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Set key/value
  public set(key: string, value: any) {
    return this._storage?.set(key, value);
  }

  // Get value
  public async get(key: string) {
    return this._storage?.get(key);
  }

  // Remove
  public remove(key: string) {
    return this._storage?.remove(key);
  }

  // Clear all
  public clear() {
    return this._storage?.clear();
  }
}
