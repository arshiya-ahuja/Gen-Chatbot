import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentSigninComponent } from './student/student-signin/student-signin.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { StudentHomeComponent } from './student/student-home/student-home.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { StudentNotFoundComponent } from './student/student-not-found/student-not-found.component';
import { StudentProfileComponent } from './student/student-profile/student-profile.component';
import {AuthGuard} from '../app/guards/auth.guard';
import { CreateIntentComponent } from './create-intent/create-intent.component';

const routes: Routes = [
  // {path: 'signup',component:StudentSignupComponent}, 
  {path: 'signin',component:StudentSigninComponent},  
  {path: 'company',component:StudentHomeComponent,
children:[
  {path:'dashboard',component:StudentDashboardComponent,
   canActivate:[AuthGuard]},
   {path:'Intent',component:CreateIntentComponent},
  {path:'profile',component:StudentProfileComponent},
  {path:'knowledgebase',component:StudentNotFoundComponent},
  {path:'entities',component:StudentNotFoundComponent},
  {path:'entitiesType',component:StudentNotFoundComponent},
  {path:'**',component:StudentNotFoundComponent},
]
},
  {path:'**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
