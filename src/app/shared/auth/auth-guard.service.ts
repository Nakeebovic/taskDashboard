import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { SharedData } from '../sharedClass';
import { HelperToolsService } from '../services/helper-tools.service';
import { BroadcasterService } from 'ng-broadcaster';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
    private router: Router,
    private broadCaster: BroadcasterService , private helperTool: HelperToolsService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise<boolean>((resolve, reject) => {
      let token = localStorage.getItem('token') || sessionStorage.getItem('token');
      console.log(token);
      if (!token) {
        this.router.navigate(['/login']);
        // this.helperTool.showAlertWithTranslation('Error', 'SessionExpired', 'warning');
        resolve(false);
      }
      this.authService.varifyToken(token).subscribe(data => {
        if (data['status'] == 'success') {
          this.broadCaster.broadcast('AdminLogin');
          SharedData.AdminInfo = data['data'];
          // TODO: build the admin permession herer
          resolve(true);
        } else {
          this.router.navigate(['/login']);
          // this.helperTool.showAlertWithTranslation('Error', 'SessionExpired', 'warning');  
          resolve(false);
        }
      }, err => {
        this.router.navigate(['/login']);
        this.helperTool.showAlertWithTranslation('Error', 'SessionExpired', 'warning');
        resolve(false);
      })
    })
  }
}
