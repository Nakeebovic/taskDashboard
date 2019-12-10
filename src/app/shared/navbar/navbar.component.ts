// import { AdminsService } from './../services/admins.service';
import { Component, AfterViewChecked, Output, EventEmitter } from '@angular/core';
import { SharedData } from '../sharedClass';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements AfterViewChecked {

  toggleClass = 'ft-maximize';
  placement = 'bottom-right'
  public isCollapsed = true;
  
  word = '';
  searchresults = {} as any;
  ImageBase = SharedData.IMAGE_BASE_URL;
  adminData = {} as any;
  @Output() directionEvent = new EventEmitter<Object>();
  Notificationcount = 0;
  constructor(private router: Router) {

  }
  ngAfterViewChecked() {
    setTimeout(() => {
      var wrapperDiv = document.getElementsByClassName("wrapper")[0];
      var dir = wrapperDiv.getAttribute("dir");
      if (dir === 'rtl') {
        this.placement = 'bottom-left';
      }
      else if (dir === 'ltr') {
        this.placement = 'bottom-right';
      }
    }, 3000);
  }

  ToggleClass() {
    if (this.toggleClass === 'ft-maximize') {
      this.toggleClass = 'ft-minimize';
    }
    else
      this.toggleClass = 'ft-maximize'
  }
  onLogoutClicked() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    SharedData.AdminInfo = undefined;
    this.router.navigate(["/login"]);
  }
  onSearch(){
    if (!this.word){
      this.searchresults = {};
      return;
    }
    // this.adminController.adminSearch(this.word).subscribe(data => {
    //   console.log(data);
    //   if (data['status'] == 'success'){
    //     this.searchresults = data['data'];
    //     console.log(this.searchresults);
    //   }
    // },err =>{

    // })
  }
  ChangeLanguage(lang) {
    this.directionEvent.emit(lang);
    // this.translate.use(lang);
  }
}
