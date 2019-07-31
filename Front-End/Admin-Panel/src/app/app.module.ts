import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StudentSigninComponent } from './student/student-signin/student-signin.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { Tokeninterceptor } from './interceptors/tokeninterceptor.service';
import { StudentHomeComponent } from './student/student-home/student-home.component';
import { StudentNavComponent } from './student/student-nav/student-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule } from '@angular/material';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { StudentNotFoundComponent } from './student/student-not-found/student-not-found.component';
import { StudentProfileComponent } from './student/student-profile/student-profile.component';
import { MenuListItemComponent } from './shared/menu-list-item/menu-list-item.component';
import { ToastrModule } from 'ngx-toastr';
import { ErrorInterceptorService } from './interceptors/error-interceptor.service';
import { HasPermissionDirective } from './shared/directives/has-permission.directive';
import { CreateIntentComponent } from './create-intent/create-intent.component';
import { KnowledgebaseComponent } from './knowledgebase/knowledgebase.component';
@NgModule({
  declarations: [
    AppComponent,
    StudentSigninComponent,

    PageNotFoundComponent,
    StudentHomeComponent,
    StudentNavComponent,
    StudentDashboardComponent,
    StudentNotFoundComponent,
    StudentProfileComponent,
    MenuListItemComponent,
    HasPermissionDirective,
    CreateIntentComponent,
    KnowledgebaseComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
  AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right'
    }) // ToastrModule added
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
     useClass: Tokeninterceptor,
     multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
       useClass: ErrorInterceptorService,
       multi: true
      },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
