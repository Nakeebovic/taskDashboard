import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";


import { TranslateModule } from '@ngx-translate/core';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
//COMPONENTS
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NotificationSidebarComponent } from './notification-sidebar/notification-sidebar.component';
import { PickPointComponent } from './components/pick-point/pick-point.component';


//DIRECTIVES
import { ToggleFullscreenDirective } from "./directives/toggle-fullscreen.directive";
import { SidebarDirective } from './directives/sidebar.directive';
import { SidebarLinkDirective } from './directives/sidebarlink.directive';
import { SidebarListDirective } from './directives/sidebarlist.directive';
import { SidebarAnchorToggleDirective } from './directives/sidebaranchortoggle.directive';
import { SidebarToggleDirective } from './directives/sidebartoggle.directive';
import { CollapseModule, BsDropdownModule, TabsModule, PaginationModule, TooltipModule } from 'ngx-bootstrap';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { TagInputModule } from 'ngx-chips';

@NgModule({
    exports: [
        CommonModule,
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        NotificationSidebarComponent,
        ToggleFullscreenDirective,
        SidebarDirective,
        TranslateModule,
        GooglePlaceModule,
    ],
    imports: [
        RouterModule,
        CommonModule,
        CollapseModule.forRoot(),
        BsDropdownModule.forRoot(),
        TranslateModule.forChild(),
        TabsModule.forRoot(),
        PerfectScrollbarModule,
        // GooglePlaceModule,
        FormsModule,
        TagInputModule, 
        PaginationModule.forRoot(),
        ReactiveFormsModule,
        TooltipModule.forRoot(),

    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        NotificationSidebarComponent,
        ToggleFullscreenDirective,
        SidebarDirective,
        SidebarLinkDirective,
        SidebarListDirective,
        SidebarAnchorToggleDirective,
        SidebarToggleDirective,
        PickPointComponent,
       
    ]
})
export class SharedModule { }
