import { Injectable } from '@angular/core';

import { SharedData } from '../sharedClass';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  createNewUser(userData) {
    let URL = `${SharedData.BASE_URL}/auth/signup`;
    return this.http.post(URL, userData);
  }
  getAllUsers(offset,status, category) {
    console.log('in user service')
    let URL = `${SharedData.BASE_URL}/auth`;
    return this.http.get(URL, { params: { offset,status, category  } });
  }
  removeUser(user_id) {
    let URL = `${SharedData.BASE_URL}/auth/remove`;
    return this.http.post(URL, { id: user_id });
  }
  getUserById(user_id) {
    let URL = `${SharedData.BASE_URL}/auth/user/${user_id}`;
    return this.http.get(URL);
  }
  editUserProfile(UserData) {
    let URL = `${SharedData.BASE_URL}/auth/edit`;
    return this.http.post(URL, UserData);
  }
  cahngeUserStatus(user_id , status){
    let URL = `${SharedData.BASE_URL}/auth/status/change`;
    return this.http.post(URL , {user_id : user_id, status:status} )
  }
}
