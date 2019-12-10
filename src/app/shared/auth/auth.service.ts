import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SharedData } from '../sharedClass';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  token: string;
  authData={} as any
  constructor(private http: HttpClient , private router: Router,) { }
  adminlogin(AdminData) {
    this.authData = AdminData
    let URL = `${SharedData.BASE_URL}/admin/login`;
    return this.http.post(URL, AdminData);
  }
  varifyToken(token) {
    let URL = `${SharedData.BASE_URL}/admin/varify`;
    return this.http.post(URL, { token: token });
  }
  logout() {
    this.token = null;
  }

  getToken() {
    return this.token;
  }

  isAuthenticated() {
    // here you can check if user is authenticated or not through his token
    return true;
  }
}
