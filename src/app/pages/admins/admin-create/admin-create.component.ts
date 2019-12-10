import { NgxSpinnerService } from 'ngx-spinner';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperToolsService } from 'app/shared/services/helper-tools.service';
import { AdminsService } from 'app/shared/services/admins.service';

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.scss']
})
export class AdminCreateComponent implements OnInit {

  AdminData = {} as any;

  regularForm: FormGroup;
  status = ["pending", "active", "not_active"];

  constructor(private helperTools: HelperToolsService,
    public router: Router, private adminController: AdminsService, private spinnerSrevice: NgxSpinnerService) {
    this.initForm();
  }

  ngOnInit() {

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
        password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
        passwordConfirm: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
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
              this.helperTools.showAlertWithTranslation("Error", "PleaseAddImageWithValidDimension", "error");
              return;
            }
            console.log("this is result of iamge");
            this.AdminData["image"] = {
              base64: ImageEleemnt[i].src.split(",")[1],
              alt: "bashmohandes image",
              description: "bashmohandes image"
            };
          };
          ImageEleemnt[i].src = base64;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onSubmitClicked() {
    if (this.AdminData['password'] != this.AdminData['passwordConfirm']) {
      this.helperTools.showAlertWithTranslation('Error', 'PasswordDoseNotMatch', 'error');
      return;
    }
    if (!this.AdminData['image']) {
      this.helperTools.showAlertWithTranslation('Error', 'PleaseAddImageWithValidDimension', 'error');
      return;
    }
    this.spinnerSrevice.show();
    this.adminController.createNewAdmin(this.AdminData).subscribe(data => {
      console.log(data);
      this.spinnerSrevice.hide();
      if (data['status'] == 'success') {
        this.helperTools.showAlertWithTranslation('Done', 'ProccessSuccessfully', 'success');
        this.router.navigate(['/admins/show']);
      } else {
        if (data['error'] && data['error']['error']  && data['error']['error']['name'] == 'SequelizeUniqueConstraintError'){
          this.helperTools.showAlertWithTranslation('Error' , 'EmailUsedBefore' , 'error');
          return;
        }
        this.helperTools.showAlertWithTranslation('Error', 'SomthingWrongHappen', 'error');
      }
    }, err => {
      this.helperTools.showAlertWithTranslation('Error', 'SomthingWrongHappen', 'error');
    })
  }


}
