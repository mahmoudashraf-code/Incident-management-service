import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http';
import { NotfoundComponent } from './notfound/notfound.component';
import { DoneErrorDialogModule } from 'src/public/done-error-dialog/done-error-dialog.module';
import { SessionInitGuard } from './session-init.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatSliderModule,
    HttpClientModule,
    DoneErrorDialogModule,
    RouterModule.forRoot([
      {
        path: "signIn",
        loadChildren: () => import("./login/login.module").then(m => m.LoginModule)
      },
      {
        path: "",
        loadChildren: () => import("./landing/landing.module").then(m => m.LandingModule)
      },
      {
        path: "dashboard",
        loadChildren: () => import("./dashboard/dashboard.module").then(m => m.DashboardModule),
        canActivate: [SessionInitGuard],
      },
      {
        path: "**",
        component: NotfoundComponent
      },
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
