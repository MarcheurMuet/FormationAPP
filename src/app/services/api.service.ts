import { User } from './../model/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Training } from '../model/training.model';
import { environment } from 'src/environments/environment';

/**
 * Service pour la gestion des requêtes API liées aux formations et aux utilisateurs.
 * Il fournit des méthodes pour interagir avec l'API REST.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  /**
   * Récupère la liste de toutes les formations depuis l'API.
   * @returns Un observable contenant la liste des formations.
   */
  public getTrainings() {
    return this.http.get<Training[]>(environment.host + '/trainings');
  }

  /**
   * Récupère les détails d'une formation spécifique par son ID.
   * @param id L'identifiant de la formation à récupérer.
   * @returns Formation
   */
  public getTraining(id: number) {
    return this.http.get<Training>(environment.host + '/trainings/' + id);
  }

  /**
   * Ajoute une nouvelle formation via l'API.
   * @param training L'objet formation à envoyer à l'API.
   * @returns Formation ajoutée
   */
  public postTraining(training: Training) {
    return this.http.post<Training>(environment.host + '/trainings/', training);
  }

  /**
   * Met à jour les informations d'une formation existante via l'API.
   * @param training L'objet formation avec les nouvelles informations.
   * @param id L'identifiant de la formation à mettre à jour.
   * @returns Formation mise à jour.
   */
  public updateTraining(training: Training, id: number) {
    return this.http.put(`${environment.host}/trainings/${id}`, training);
  }

  /**
   * Supprime une formation via l'API.
   * @param id L'identifiant de la formation à supprimer.
   * @returns Suppression de la formation
   */
  public deleteTraining(id: number) {
    return this.http.delete<Training>(environment.host + '/trainings/' + id);
  }

  /**
   * Récupère la liste de tous les utilisateurs depuis l'API.
   * @returns Liste des utilisateurs.
   */
  public getUsers() {
    return this.http.get<User[]>(environment.host + '/users/');
  }

  /**
   * Récupère les détails d'un utilisateur spécifique par son adresse email.
   * @param email L'email de l'utilisateur à récupérer.
   * @returns Utilisateur correspondant à l'email.
   */
  public getUser(email: String) {
    return this.http.get<User>(environment.host + `/users?email=${email}`);
  }

  /**
   * Ajoute un nouvel utilisateur via l'API.
   * @param user L'objet utilisateur à envoyer à l'API.
   * @returns L'utilisateur ajouté.
   */
  public addUser(user: User) {
    return this.http.post<User>(`${environment.host}/users/`, user);
  }

  /**
   * Supprime un utilisateur via l'API.
   * @param id L'identifiant de l'utilisateur à supprimer.
   * @returns Supprimer utilisateur.
   */
  public deleteUser(id: number) {
    return this.http.delete<User>(environment.host + '/users/' + id);
  }
}
