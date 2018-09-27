import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API } from '../../variables';
import { User } from './user';


@Injectable()
export class UserService {

  public user: User = null;

  constructor(private http: HttpClient) {}

  login(credentials: {username: string, password: string}): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http.post(API + '/session', credentials).subscribe(data => {
        console.log(data);
        resolve(this.user = new User(data));
      }, error => {
        console.log(error.error.text);
      });
    });
  }

}
