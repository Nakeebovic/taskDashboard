import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HelperToolsService } from 'app/shared/services/helper-tools.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BannersService } from 'app/shared/services/banners.service';
import { MarketsService } from 'app/shared/services/markets.service';
import { LocationService } from 'app/shared/services/location.service';
import { UsersService } from 'app/shared/services/users.service';
import { PickPointComponent } from 'app/shared/components/pick-point/pick-point.component';
import { SharedData } from 'app/shared/sharedClass';
import { BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  UserData = {} as any;
  regularForm: FormGroup;
  status = ["pending", "active", "not_active"];
  constructor(private helperTools: HelperToolsService,
    public router: Router,
    private spinnerService: NgxSpinnerService,
     private usersController: UsersService) {}

  ngOnInit() {
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
    this.usersController.createNewUser(this.UserData).subscribe(data => {
      this.spinnerService.hide();
      console.log(data);
      if (data['status'] == 'success') {
        this.router.navigate(['/users/show']);
        this.helperTools.showAlertWithTranslation("Done", "ProccessSuccessfully", "success");
      } else {
        if (
          data["error"]["error"]["errors"]["0"]["message"] ==
          "phone must be unique"
        ) {
          this.helperTools.showAlertWithTranslation(
            "Error",
            "PhoneMustBeUniqe",
            "error"
          );
        }else{
          this.helperTools.showAlertWithTranslation(
            "Error",
            "SomthingWrongHappen",
            "error"
          );
        }
      }
    }, err => {
      this.spinnerService.hide();
      this.helperTools.showAlertWithTranslation("Error", "SomthingWrongHappen", "error");
    })
  }

}
