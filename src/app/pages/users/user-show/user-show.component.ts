import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperToolsService } from './../../../shared/services/helper-tools.service';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'app/shared/services/users.service';
import { SharedData } from 'app/shared/sharedClass';

@Component({
  selector: 'app-user-show',
  templateUrl: './user-show.component.html',
  styleUrls: ['./user-show.component.scss']
})
export class UserShowComponent implements OnInit {

  Users = {} as any;
  filterData = { category: false, status: false, offset: 1 };
  usersCount = 0;

  imageBaseURL = SharedData.IMAGE_BASE_URL;
  constructor(private helperTools: HelperToolsService,
    private userController: UsersService, private spinerService: NgxSpinnerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(parmas => {
      console.log(parmas)
      this.filterData.status = parmas['status'] || false;
      this.getAllUsers();
    })
  }
  getAllUsers() {
    // if (this.Users[this.filterData['offset']]) {
    //   return;
    // }
    this.spinerService.show();
    this.userController.getAllUsers(this.filterData.offset - 1,this.filterData.status, this.filterData.category).subscribe(data => {
      console.log(data);
      this.spinerService.hide();
      if (data['status'] == 'success') {
        this.Users[this.filterData.offset] = data['data']['rows'];
        this.usersCount = data['data']['count'];
      } else {
        this.helperTools.showAlertWithTranslation("Error", "SomthingWrongHappend", "error");
      }
    }, err => {
      this.spinerService.hide();
      this.helperTools.showAlertWithTranslation("Error", "SomthingWrongHappens", "error");
    })
  }
  onApproveUserclicked(user, status) {
    this.helperTools.showConfirmAlert('AreYouSure', 'WantToApprove').then(__ => {
      this.spinerService.show();
      this.userController.cahngeUserStatus(user.id , status).subscribe(data => {
        this.spinerService.hide();
        if (data['status'] == 'success') {
          this.Users = {} as any;
          this.filterData.offset = 1;
          this.getAllUsers();
        } else {
          this.helperTools.showAlertWithTranslation("Error", "SomthingWrongHappen", "error");
        }
      }, err => {
        this.spinerService.hide();
        this.helperTools.showAlertWithTranslation("Error", "SomthingWrongHappen", "error");
      })
    })
  }
  onDeleteUserClicked(user) {
    this.helperTools.showConfirmAlert('AreYouSure', 'WantToDelete').then(__ => {
      this.spinerService.show();
      this.userController.removeUser(user.id).subscribe(data => {
        this.spinerService.hide();
        if (data['status'] == 'success') {
          this.Users = {} as any;
          this.filterData.offset = 1;
          this.getAllUsers();
        } else {
          this.helperTools.showAlertWithTranslation("Error", "SomthingWrongHappen", "error");
        }
      }, err => {
        this.spinerService.hide();
        this.helperTools.showAlertWithTranslation("Error", "SomthingWrongHappen", "error");
      })
    }).catch(er => {

    })
  }
  onLoadMore(offset) {
    this.filterData.offset = offset;
    this.getAllUsers();
  }

}
