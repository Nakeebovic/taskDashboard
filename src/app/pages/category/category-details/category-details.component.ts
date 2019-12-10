import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HelperToolsService } from 'app/shared/services/helper-tools.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from 'app/shared/services/category.service';
import { MarketsService } from 'app/shared/services/markets.service';
import { SharedData } from 'app/shared/sharedClass';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subscription, combineLatest } from 'rxjs';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
  regularForm: FormGroup;
  CategoryData = {} as any;
  constructor(
    private helperTools: HelperToolsService,
    public router: Router,
    private SpinnerService: NgxSpinnerService,
    private categoryController: CategoryService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe(data => {
      if (data['id']) {
        this.getCategoryById(data['id']);
      }
    })
  }


  initForm() {
    this.regularForm = new FormGroup(
      {
        name: new FormControl(null, [
          Validators.required,
          Validators.maxLength(20)
        ]),
      },
      { updateOn: "blur" }
    );
  }
 
  getCategoryById(id) {
    this.SpinnerService.show();
    this.categoryController.getCategoryById(id).subscribe(data => {
      this.SpinnerService.hide();
      console.log(data);
      if (data['status'] == 'success') {
        this.CategoryData = data['data'];
      } else {
        this.helperTools.showAlertWithTranslation(
          "Error",
          "SomthingWrongHappen",
          "error"
        );
      }
    }, err => {
      this.SpinnerService.hide();
      this.helperTools.showAlertWithTranslation(
        "Error",
        "SomthingWrongHappen",
        "error"
      );
    })
  }
  onSubmitClicked() {
    console.log(this.CategoryData)
    this.SpinnerService.show();
    this.categoryController.editProductCategory(this.CategoryData).subscribe(data => {
      this.SpinnerService.hide();
      if (data['status'] == 'success') {
        this.helperTools.showAlertWithTranslation(
          "Done",
          "ProccessSuccessfully",
          "success"
        );
        this.router.navigate(['/category/show']);
      } else {
        this.helperTools.showAlertWithTranslation(
          "Error",
          "SomthingWrongHappen",
          "error"
        );
      }
    }, err => {
      this.SpinnerService.hide();
      this.helperTools.showAlertWithTranslation(
        "Error",
        "SomthingWrongHappen",
        "error"
      );
    })
  }
}
