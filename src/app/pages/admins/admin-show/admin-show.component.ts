import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedData } from 'app/shared/sharedClass';

import { Router, Route } from '@angular/router';
import { HelperToolsService } from 'app/shared/services/helper-tools.service';
import { AdminsService } from 'app/shared/services/admins.service';

@Component({
  selector: 'app-admin-show',
  templateUrl: './admin-show.component.html',
  styleUrls: ['./admin-show.component.scss']
})
export class AdminShowComponent implements OnInit {

  offset = 1;
  role_id = false;
  status = false;
  admins = {} as any;
  adminsCount = 0;
  imageBaseURL = SharedData.IMAGE_BASE_URL;
  statusArr = ['pending', 'active', 'not_active'];

  constructor(private helperTools: HelperToolsService,
    private adminController: AdminsService,
    private routexy: ActivatedRoute,
    private spinnerService: NgxSpinnerService,
    private router: Router) { }

  ngOnInit() {
    this.routexy.data.subscribe(params => {
      if (params['status']) {
        this.status = params['status'];
      }
      this.getAllAdmins();
    }, err => { })

  }
  getAllAdmins() {
    if (this.admins[this.offset]) {
      return;
    }
    this.spinnerService.show();
    this.adminController.getAdmins(this.offset - 1, this.role_id, this.status).subscribe(data => {
      console.log(data)
      this.spinnerService.hide();
      if (data['status'] == 'success') {
        this.admins[this.offset] = data['data']['rows'];
        this.adminsCount = data['data']['count'];
      } else {
        this.helperTools.showAlertWithTranslation('Error', 'SomthingWrongHappen', 'error');
      }
    }, err => {
      this.spinnerService.hide();
      this.helperTools.showAlertWithTranslation('Error', 'SomthingWrongHappen', 'error');
    })
  }
  onLoadMore() {
    this.getAllAdmins();
  }
  onEditClicked(admin) {
    SharedData.CurrentAdminDetails = admin;
    this.router.navigate(['/admins/details/' + admin.id]);
  }
  onDeleteClicked(admin) {
    this.helperTools.showConfirmAlert('AreYouSure', 'WantToDelete').then(__ => {
      this.spinnerService.show();
      this.adminController.deleteAdmin(admin.id).subscribe(data => {
        this.spinnerService.hide();
        if (data['status'] == 'success') {
          this.helperTools.showAlertWithTranslation('Done', 'ProccessSuccessfully', 'success');
          this.offset = 1;
          this.admins = {} as any;
          this.onLoadMore();
        } else {
          this.helperTools.showAlertWithTranslation('Error', 'SomthingWrongHappen', 'error');
        }
      }, err => {
        this.spinnerService.hide();
        this.helperTools.showAlertWithTranslation('Error', 'SomthingWrongHappen', 'error');
      })
    }).catch(err => {
      // UserCanceld
    })
  }

}
