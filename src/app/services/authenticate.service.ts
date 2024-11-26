import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';
import * as CryptoJS from 'crypto-js';

import { User } from '../model/user.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  private user: User | null = null;

  constructor() {
    let localStorageUser = localStorage.getItem('currentUser');
    if (localStorageUser) {
      const decryptDataUser = this.decryptDataUser(localStorageUser);
      this.user = JSON.parse(decryptDataUser);
    }
  }

  setUser(user: User): void {
    this.user = user;
  }

  getUser(): User {
    return this.user || new User('', '');
  }

  isLogin(): boolean {
    if (!this.user) return false;
    const user = JSON.stringify(this.user);
    const userCryptedData = this.encryptDataUser(user);
    localStorage.setItem('currentUser', userCryptedData);
    return this.user ? true : false;
  }

  isAdmin(): boolean {
    return this.isLogin() && this.userHasRole('ADMIN') ? true : false;
  }

  isUser(): boolean {
    return this.isLogin() && this.userHasRole('USER') ? true : false;
  }

  private userHasRole(role: string): boolean {
    return this.user?.roles.includes(role) ? true : false;
  }

  logout(): void {
    this.user = null;
    localStorage.removeItem('currentUser');
  }

  hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  }

  authComparePassword(password: string, hashedPassword: string): boolean {
    const isValid = bcrypt.compareSync(password, hashedPassword);
    return isValid;
  }

  encryptDataUser(dataUser: string): string {
    return CryptoJS.AES.encrypt(dataUser, environment.cryptoKey).toString();
  }

  decryptDataUser(dataUser: string) {
    return CryptoJS.AES.decrypt(dataUser, environment.cryptoKey).toString(
      CryptoJS.enc.Utf8
    );
  }
}
