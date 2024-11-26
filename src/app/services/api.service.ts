import { User } from './../model/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Training } from '../model/training.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public getTrainings() {
    return this.http.get<Training[]>(environment.host + '/trainings');
  }

  public getTraining(id: number) {
    return this.http.get<Training>(environment.host + '/trainings/' + id);
  }

  public postTraining(training: Training) {
    return this.http.post<Training>(environment.host + '/trainings/', training);
  }

  public updateTraining(training: Training, id: number) {
    return this.http.put(`${environment.host}/trainings/${id}`, training);
  }

  public deleteTraining(id: number) {
    return this.http.delete<Training>(environment.host + '/trainings/' + id);
  }

  public getUsers() {
    return this.http.get<User[]>(environment.host + '/users/');
  }
  

  public getUser(email : String){
    return this.http.get<User>(environment.host + `/users?email=${email}`);
  }
  
public addUser(user: User) {
  return this.http.post<User>(`${environment.host}/users/`, user);
}

public deleteUser(id : number){
  return this.http.delete<User>(environment.host + '/users/' + id);
}

}
