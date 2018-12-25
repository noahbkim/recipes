import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API } from '../../variables';
import { User } from './user';


@Injectable()
export class UserService {

  public me: User = null;

  constructor(private http: HttpClient) {}

  // public get(): Promise<User> {
  //
  // }

  public login(credentials: {username: string, password: string}): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http.post(API + '/session', credentials).subscribe(data => {
        resolve(this.me = new User(data));
      }, error => reject(error.error.text));
    });
  }

  public logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.delete(API + '/session').subscribe(() => resolve(), reject);
    });
  }

}
