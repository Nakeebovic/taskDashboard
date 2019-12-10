
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
// import { SharedModule } from "./shared/shared.module";
import {SharedModule} from "./shared/shared.module";
import { AppComponent } from './app.component';
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from './shared/auth/auth-guard.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import * as $ from 'jquery';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BroadcasterService } from "ng-broadcaster";
import { ModalModule } from 'ngx-bootstrap';
import { PickPointComponent } from './shared/components/pick-point/pick-point.component';
import { MomentModule } from 'ngx-moment';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
// import { SearchPipe } from './shared/pipes/search.pipe';
import { SidebarDirective } from './shared/directives/sidebar.directive';
import { from } from 'rxjs';
import { CollapseModule } from 'ngx-bootstrap/collapse';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}



@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    ContentLayoutComponent,
    // PickPointComponent,
    // SearchPipe
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    CollapseModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    NgxSpinnerModule,
    FormsModule,
    ModalModule.forRoot(),
    MomentModule,
    CollapseModule.forRoot(),
  ],
  providers: [
    AuthService,
    AuthGuard,
    BroadcasterService,
  ],
  bootstrap: [AppComponent],
  entryComponents : [PickPointComponent]
})
export class AppModule { }
