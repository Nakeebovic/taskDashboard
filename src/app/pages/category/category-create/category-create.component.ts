import { Component, ChangeDetectorRef, TemplateRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { combineLatest, Subscription } from 'rxjs';
import { HelperToolsService } from 'app/shared/services/helper-tools.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from 'app/shared/services/category.service';
import { MarketsService } from 'app/shared/services/markets.service';
@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {
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
    this.route.data.subscribe(data => {
      console.log(data)
      if (data['type']) {
        this.CategoryData.type = data['type']
      }
    })
    this.initForm();
    // this.loadAllMarkets()
  }
  // loadAllMarkets() {
  //   this.marketService.getAllMarkets('', false, 'id,name').subscribe(data => {
  //     if (data['status'] == 'success') {
  //       this.markets = data['data']['rows'];
  //     } else {
  //       this.helperTools.showAlertWithTranslation("Error", "SomthingWrongHappen", "error");
  //     }
  //   }, err => {
  //     this.helperTools.showAlertWithTranslation("Error", "SomthingWrongHappen", "error");
  //   })
  // }
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

  onSubmitClicked() {
    this.SpinnerService.show();
    this.categoryController.createNewProductCategory(this.CategoryData).subscribe(
      data => {
        this.SpinnerService.hide();
        console.log(data);
        if (data["status"] == "success") {
          this.helperTools.showAlertWithTranslation(
            "Done",
            "ProccessSuccessfully",
            "success"
          );
          this.router.navigate(['/category/show']);
        } else {
          this.helperTools.showAlertWithTranslation(
            "Error",
            "SomthingWrongHappendd",
            "error"
          );
        }
      },
      err => {
        this.SpinnerService.hide();
        this.helperTools.showAlertWithTranslation(
          "Error",
          "SomthingWrongHappenndd",
          "error"
        );
      }
    );
  }
}
