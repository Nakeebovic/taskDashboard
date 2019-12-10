import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HelperToolsService } from 'app/shared/services/helper-tools.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MarketsService } from 'app/shared/services/markets.service';
import { LocationService } from 'app/shared/services/location.service';
import { UsersService } from 'app/shared/services/users.service';
import { SharedData } from 'app/shared/sharedClass';
import { BsModalService } from 'ngx-bootstrap';
import { PickPointComponent } from 'app/shared/components/pick-point/pick-point.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  UserData = {} as any;
  regularForm: FormGroup;
  status = ["pending", "active", "not_active"];
  constructor(private helperTools: HelperToolsService,
    public router: Router,
    private spinnerService: NgxSpinnerService,
    private usersController: UsersService, private route: ActivatedRoute) {
    this.route.params.subscribe(parmas => {
      if (parmas['id']) {
        this.getUserById(parmas['id']);
      }
    })
  }
  getUserById(user_id) {
    this.spinnerService.show();
    this.usersController.getUserById(user_id).subscribe(data => {
      this.spinnerService.hide();
      console.log(data)
      if (data['status'] == 'success') {
        this.UserData = data['data'];
      } else {
        this.helperTools.showAlertWithTranslation("Error", "SomthingWrongHappenaa", "error");

      }
    }, err => {
      this.spinnerService.hide();
      this.helperTools.showAlertWithTranslation("Error", "SomthingWrongHappenww", "error");
    })
  }

  ngOnInit() {
    // this.loadAllCountries();
    this.regularForm = new FormGroup(
      {
       
        phone: new FormControl(null, [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11)
        ]),
      
        status: new FormControl(),
      },
      { updateOn: "blur" }
    );
  }
  
 
  onCreatePressed() {
    this.spinnerService.show();
    this.usersController.editUserProfile(this.UserData).subscribe(data => {

      this.spinnerService.hide();
      console.log(data)
      if (data['status'] == 'success') {
        this.router.navigate(['/users/show']);
        // this.router.navigate(['/users/show']);
        this.helperTools.showAlertWithTranslation("Done", "ProccessSuccessfully", "success");
      } else {
        this.helperTools.showAlertWithTranslation("Error", data['message'], "error");
      }
    }, err => {
      console.log(err)
      this.spinnerService.hide();
      this.helperTools.showAlertWithTranslation("Error", "SomthingWrongHappen", "error");
    })
  }
}
