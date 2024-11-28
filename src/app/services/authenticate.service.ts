import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';
import * as CryptoJS from 'crypto-js';

import { User } from '../model/user.model';
import { environment } from 'src/environments/environment';

/**
 * Service d'authentification qui gère les opérations de login, de gestion des rôles d'utilisateur, 
 * et de cryptage/décryptage des données utilisateur.
 */

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  private user: User | null = null;

  /**
   * Le constructeur initialise le service en récupérant l'utilisateur actuel du localStorage 
   * et en le décryptant si des données existent.
   */
  constructor() {
    let localStorageUser = localStorage.getItem('currentUser');
    if (localStorageUser) {
      const decryptDataUser = this.decryptDataUser(localStorageUser);
      this.user = JSON.parse(decryptDataUser);
    }
  }

  /**
   * Définit l'utilisateur actuel dans le service.
   * @param user L'utilisateur à définir dans le service.
   */
  setUser(user: User): void {
    this.user = user;
  }

  /**
   * Récupère l'utilisateur actuel du service. Si aucun utilisateur n'est défini, retourne un utilisateur vide.
   * @returns L'utilisateur actuel ou un utilisateur par défaut vide.
   */
  getUser(): User {
    return this.user || new User('', '');
  }

  /**
   * Vérifie si l'utilisateur est connecté. Si l'utilisateur est connecté, les informations de l'utilisateur
   * sont chiffrées et stockées dans le localStorage.
   * @returns `true` si l'utilisateur est connecté, sinon `false`.
   */
  isLogin(): boolean {
    if (!this.user) return false;
    const user = JSON.stringify(this.user);
    const userCryptedData = this.encryptDataUser(user);
    localStorage.setItem('currentUser', userCryptedData);
    return this.user ? true : false;
  }

  /**
   * Vérifie si l'utilisateur connecté possède le rôle "ADMIN".
   * @returns true si l'utilisateur est un administrateur, sinon false.
   */
  isAdmin(): boolean {
    return this.isLogin() && this.userHasRole('ADMIN') ? true : false;
  }

  /**
   * Vérifie si l'utilisateur connecté possède le rôle "USER".
   * @returns true si l'utilisateur est un utilisateur, sinon false.
   */

  isUser(): boolean {
    return this.isLogin() && this.userHasRole('USER') ? true : false;
  }

  /**
   * Vérifie si l'utilisateur possède un rôle spécifique.
   * @param role Le rôle à vérifier (ex. "ADMIN" ou "USER").
   * @returns `true` si l'utilisateur possède ce rôle, sinon `false`.
   */

  private userHasRole(role: string): boolean {
    return this.user?.roles.includes(role) ? true : false;
  }

  /**
   * Déconnecte l'utilisateur actuel en supprimant les informations de l'utilisateur du service
   * et en supprimant les données du localStorage.
   */
  logout(): void {
    this.user = null;
    localStorage.removeItem('currentUser');
  }

  /**
   * Hache un mot de passe en utilisant bcrypt pour assurer la sécurité.
   * @param password Le mot de passe à hacher.
   * @returns Le mot de passe haché.
   */
  hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  }

  /**
   * Compare un mot de passe fourni avec un mot de passe haché pour vérifier si les deux correspondent.
   * @param password Le mot de passe en clair fourni.
   * @param hashedPassword Le mot de passe haché à comparer.
   * @returns `true` si les mots de passe correspondent, sinon `false`.
   */
  authComparePassword(password: string, hashedPassword: string): boolean {
    const isValid = bcrypt.compareSync(password, hashedPassword);
    return isValid;
  }

  /**
   * Chiffre les données utilisateur
   * @param dataUser Les données utilisateur à chiffrer (sous forme de chaîne).
   * @returns La chaîne chiffrée.
   */
  encryptDataUser(dataUser: string): string {
    return CryptoJS.AES.encrypt(dataUser, environment.cryptoKey).toString();
  }

  /**
   * Déchiffre les données utilisateur précédemment chiffrées.
   * @param dataUser Les données chiffrées à déchiffrer.
   * @returns Les données déchiffrées sous forme de chaîne.
   */
  decryptDataUser(dataUser: string): string {
    return CryptoJS.AES.decrypt(dataUser, environment.cryptoKey).toString(CryptoJS.enc.Utf8);
  }
}
