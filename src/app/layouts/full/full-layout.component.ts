import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2 } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { SharedData } from "app/shared/sharedClass";
import { DOCUMENT } from '@angular/platform-browser';
import { ConfigService } from 'app/shared/services/config.service';

@Component({
  selector: "app-full-layout",
  templateUrl: "./full-layout.component.html",
  styleUrls: ["./full-layout.component.scss"]
})
export class FullLayoutComponent {
  @ViewChild("sidebarBgImage") sidebarBgImage: ElementRef;
  @ViewChild("appSidebar") appSidebar: ElementRef;
  @ViewChild("wrapper") wrapper: ElementRef;

  options = {
    direction: "ltr",
    bgColor: "black",
    bgImage: "assets/img/sidebar-bg/01.jpg"
  };
  hideSidebar: boolean;
  iscollapsed = false;
  isSidebar_sm = false;
  isSidebar_lg = false;
  bgColor = "black";
  bgImage = "assets/img/sidebar-bg/01.jpg";

  public config: any = {};

  constructor(
    private elementRef: ElementRef,
    private configService: ConfigService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2, private translate : TranslateService
  ) {


  }

  ngOnInit() {
    this.config = this.configService.templateConf;
    this.bgColor = this.config.layout.sidebar.backgroundColor;

    if (!this.config.layout.sidebar.backgroundImage) {
      this.bgImage = "";
    } else {
      this.bgImage = this.config.layout.sidebar.backgroundImageURL;
    }

    if (this.config.layout.variant === "Transparent") {
      if (this.config.layout.sidebar.backgroundColor.toString().trim() === "") {
        this.bgColor = "bg-glass-1";
      }
    } else {
      if (this.config.layout.sidebar.backgroundColor.toString().trim() === "") {
        this.bgColor = "black";
      }
    }

    setTimeout(() => {
      if (this.config.layout.sidebar.size === "sidebar-lg") {
        this.isSidebar_sm = false;
        this.isSidebar_lg = true;
      } else if (this.config.layout.sidebar.size === "sidebar-sm") {
        this.isSidebar_sm = true;
        this.isSidebar_lg = false;
      } else {
        this.isSidebar_sm = false;
        this.isSidebar_lg = false;
      }
      this.iscollapsed = this.config.layout.sidebar.collapsed;
      
    }, 0);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      // if (this.config.layout.dir) {
      //   this.options.direction = this.config.layout.dir;
      // }
      let lang = localStorage.getItem('lang');
      this.LangualgeChanged(lang);

      if (this.config.layout.variant === "Dark") {
        this.renderer.addClass(this.document.body, "layout-dark");
      } else if (this.config.layout.variant === "Transparent") {
        this.renderer.addClass(this.document.body, "layout-dark");
        this.renderer.addClass(this.document.body, "layout-transparent");
        if (this.config.layout.sidebar.backgroundColor) {
          this.renderer.addClass(
            this.document.body,
            this.config.layout.sidebar.backgroundColor
          );
        } else {
          this.renderer.addClass(this.document.body, "bg-glass-1");
        }
        this.bgColor = "black";
        this.options.bgColor = "black";
        this.bgImage = "";
        this.options.bgImage = "";
        this.bgImage = "";
        this.renderer.setAttribute(
          this.sidebarBgImage.nativeElement,
          "style",
          "display: none"
        );
      }
    }, 0);
  }

  toggleHideSidebar($event: boolean): void {
    setTimeout(() => {
      this.hideSidebar = $event;
    }, 0);
  }

  getOptions($event): void {
    this.options = $event;
  }
  LangualgeChanged(lang) {
    this.translate.setDefaultLang(lang);
    console.log(lang);
    this.translate.use(lang);
    if (lang == "ar") {
      this.options.direction = "rtl";
      localStorage.setItem("lang", "ar");
      this.config.dir = 'rtl';
    } else {
      localStorage.setItem("lang", "en");
      this.options.direction = "ltr";
      this.config.dir = 'ltr';
    }
    //SharedData.CurrentDirection = lang == 'ar' ? 'rtl' : 'ltr';
  }
  onLangChange(value) {
    console.log(value);
    this.LangualgeChanged(value);
  }
}
