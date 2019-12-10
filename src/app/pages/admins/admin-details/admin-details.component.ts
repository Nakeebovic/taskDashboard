import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { SharedData } from 'app/shared/sharedClass';
import { HelperToolsService } from 'app/shared/services/helper-tools.service';
import { AdminsService } from 'app/shared/services/admins.service';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.scss']
})
export class AdminDetailsComponent implements OnInit {


  AdminData = {} as any;

  regularForm: FormGroup;
  status = ["pending", "active", "not_active"];
  ImageBaseURL = SharedData.IMAGE_BASE_URL;
  constructor(private helperTools: HelperToolsService,
    public router: Router, private adminController: AdminsService,
    private spinnerSrevice: NgxSpinnerService, private Activatedroute: ActivatedRoute) {
    this.initForm();
  }

  ngOnInit() {
    this.Activatedroute.params.subscribe(params => {
      if (params['id']) {
        this.getAdminById(params['id']);
      } else {
        this.router.navigate(['/admins/show']);
      }
    }, err => { })
  }
  getAdminById(id) {
    this.spinnerSrevice.show();
    this.adminController.getAdminByid(id).subscribe(data => {
      this.spinnerSrevice.hide();
      if (data['status'] == 'success' && data['data']) {
        this.AdminData = data['data'];
        this.AdminData['password'] = undefined;
        this.AdminData['new_password'] = undefined;
        this.AdminData['passwordConfirm'] = undefined;
      } else {
        this.router.navigate(['/admins/show']);
      }
    }, err => {
      this.router.navigate(['/admins/show']);
    })
  }
  initForm() {
    this.regularForm = new FormGroup(
      {
        name: new FormControl(null, [
          Validators.required,
          Validators.maxLength(20)
        ]),
        email: new FormControl(null, [
          Validators.email,
          Validators.required,
        ]),
        status: new FormControl(null, [Validators.required]),
        device_id: new FormControl(),
        new_password: new FormControl(),
        passwordConfirm: new FormControl(),

        // passwords: this.formBuilder.group({
        //   password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
        //   passwordConfirm: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
        // }, { validator: this.checkPasswords })
        // role_is : new FormControl()
        // category_id: new FormControl(null, [Validators.required]),
        // subcategory_id: new FormControl(),
        // subsubcategory_id: new FormControl()
      },
      { updateOn: "blur" }
    );
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('passwordConfirm').value;

    return pass === confirmPass ? null : { notSame: true }
  }
  onFileChanges(evt) {
    var files = evt.target.files;
    let ImageEleemnt = {};
    for (let i = 0; i < files.length; i++) {
      var file = files[i];
      if (files && file) {
        let reader: FileReader = new FileReader();
        reader.onload = () => {
          console.log("this is the place of reader");
          var base64 = reader["result"] as string;
          let x = new Image();
          ImageEleemnt[i] = new Image();
          ImageEleemnt[i].onload = () => {
            if (
              ImageEleemnt[i].naturalWidth < 500 ||
              ImageEleemnt[i].naturalHeight < 500
            ) {
              this.helperTools.showAlertWithTranslation(
                "Error",
                "PleaseAddImageWithValidDimension",
                "error"
              );
              return;
            }
            if (this.AdminData["image"]) {
              this.AdminData["image"]["action"] = "edited";
              this.AdminData["image"]["base64"] = ImageEleemnt[i].src.split(",")[1];
            } else {
              this.AdminData["image"] = {
                base64: ImageEleemnt[i].src.split(",")[1],
                alt: "bashmohandes image",
                description: "bashmohandes image",
                action: "new"
              };
            }
          };
          ImageEleemnt[i].src = base64;
        };
        reader.readAsDataURL(file);
      }
    }
  }
  onSubmitClicked() {
    if (this.AdminData['new_password'] != this.AdminData['passwordConfirm']) {
      this.helperTools.showAlertWithTranslation('Error', 'PasswordDoseNotMatch', 'error');
      return;
    }
    if (!this.AdminData['image']) {
      this.helperTools.showAlertWithTranslation('Error', 'PleaseAddImageWithValidDimension', 'error');
      return;
    }
    this.spinnerSrevice.show();
    this.AdminData['role'] = 'admin';
    this.adminController.editAdmin(this.AdminData).subscribe(data => {
      this.spinnerSrevice.hide();
      if (data['status'] == 'success') {
        this.helperTools.showAlertWithTranslation('Done', 'ProccessSuccessfully', 'success');
        this.router.navigate(['/admins/show']);
      } else {
        if (data['error'] && data['error']['error'] && data['error']['error']['name'] == 'SequelizeUniqueConstraintError') {
          this.helperTools.showAlertWithTranslation('Error', 'EmailUsedBefore', 'error');
          return;
        }
        this.helperTools.showAlertWithTranslation('Error', 'SomthingWrongHappen', 'error');
      }
    }, err => {
      this.helperTools.showAlertWithTranslation('Error', 'SomthingWrongHappen', 'error');
    })
  }

}
