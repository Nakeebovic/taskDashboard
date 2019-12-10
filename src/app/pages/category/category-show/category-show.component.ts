import { Component, OnInit } from '@angular/core';
import { HelperToolsService } from 'app/shared/services/helper-tools.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from 'app/shared/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedData } from 'app/shared/sharedClass';

@Component({
  selector: 'app-category-show',
  templateUrl: './category-show.component.html',
  styleUrls: ['./category-show.component.scss']
})
export class CategoryShowComponent implements OnInit {

  filterData = { offset: 1, status: false, type: false } as any;
  categories = [] as any;
  categoriesCount = 0;
  constructor(
    private helperTools: HelperToolsService,
    private SpinnerSerivce: NgxSpinnerService,
    private categoryController: CategoryService,
    private router: Router,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedroute.data.subscribe(params => {
      this.getAllCategories();
    })
  }

  getAllCategories() {
 
    this.SpinnerSerivce.show();
    this.categoryController.getAllcategory(this.filterData.offset - 1, this.filterData.type, false).subscribe(data => {
      console.log(data);
      this.SpinnerSerivce.hide();
      if (data["status"] == "success") {
        this.categories = data["data"]["rows"];
        this.categoriesCount = data["data"]["count"];
        console.log(this.categoriesCount)

      } else {
        this.helperTools.showAlertWithTranslation(
          "Error",
          "SomthingWrongHappen",
          "error"
        );
      }
    },
      err => {
        this.helperTools.showAlertWithTranslation(
          "Error",
          "SomthingWrongHappen",
          "error"
        );
      }
    );
  }
  onDeleteClicked(cat) {
    this.helperTools.showConfirmAlert('AreYouSure', 'WantToDelete').then(__ => {
      this.SpinnerSerivce.show();
      this.categoryController.removeProductCategory(cat.id).subscribe(data => {
        this.SpinnerSerivce.hide();
        if (data['status'] == 'success') {
          this.helperTools.showAlertWithTranslation('Done', 'ProccessSuccessfully', 'success');
          this.filterData['offset'] = 1;
          this.categories = [];
          this.getAllCategories();
        } else {
          this.helperTools.showAlertWithTranslation('Error', 'SomthingWrongHappen', 'error');
        }
      }, err => {
        this.SpinnerSerivce.hide();
        this.helperTools.showAlertWithTranslation('Error', 'SomthingWrongHappen', 'error');
      })
    }).catch(err => {

    })
  }
  LoadMore(event) {

    this.filterData.offset = event;
    this.getAllCategories();
  }

}
