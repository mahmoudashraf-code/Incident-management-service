import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { ConfirmDialogModule } from 'src/public/confirm-dialog/confirm-dialog.module';
import { TabsService } from './tabs.service';
import { DoneErrorDialogModule } from 'src/public/done-error-dialog/done-error-dialog.module';
import { AdminOnlyGuard } from './admin-only.guard';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatButtonModule,
    MatMenuModule,
    DoneErrorDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    ConfirmDialogModule,
    MatDividerModule,
    MatIconModule,
    RouterModule.forChild([
      {
        path: "",
        component: DashboardComponent,
        children: [
          {
            path: "",
            loadChildren: () => import("./pages/docx/docx.module").then(m => m.DocxModule),
          },
          {
            path: "users",
            loadChildren: () => import("./pages/users/users.module").then(m => m.UsersModule),
            canActivate: [AdminOnlyGuard]
          },
          {
            path: "account",
            loadChildren: () => import("./pages/account/account.module").then(m => m.AccountModule),
          },
          {
            path: "incident",
            loadChildren: () => import("./pages/incident/incident.module").then(m => m.IncidentModule),
            canActivate: [AdminOnlyGuard]
          },
          {
            path: "user",
            loadChildren: () => import("./pages/user/user.module").then(m => m.UserModule),
          },
          {
            path: "setting",
            loadChildren: () => import("./pages/setting/setting.module").then(m => m.SettingModule),
            canActivate: [AdminOnlyGuard]
          }
        ]
      }
    ])
  ],
  providers: [TabsService, AdminOnlyGuard]
})
export class DashboardModule { }
