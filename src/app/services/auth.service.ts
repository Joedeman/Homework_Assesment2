import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async signup(email: string, password: string): Promise<boolean> {
    const users = (await this._storage?.get('users')) || [];
    
    // Check if user already exists
    const userExists = users.some((u: User) => u.email === email);
    if (userExists) return false;

    users.push({ email, password });
    await this._storage?.set('users', users);
    return true;
  }

  async login(email: string, password: string): Promise<boolean> {
    const users: User[] = (await this._storage?.get('users')) || [];

    const matchedUser = users.find(u => u.email === email && u.password === password);
    if (matchedUser) {
      await this._storage?.set('isLoggedIn', true);
      this.isAuthenticated = true;
      return true;
    }

    return false;
  }

  async logout() {
    await this._storage?.remove('isLoggedIn');
    this.isAuthenticated = false;
  }

  async isLoggedIn(): Promise<boolean> {
    const status = await this._storage?.get('isLoggedIn');
    return !!status;
  }
}
