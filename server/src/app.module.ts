import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { SettingModule } from './setting/setting.module';
import { IncidentModule } from './incident/incident.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    SettingModule,
    IncidentModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'views'),
      exclude: ['/api*'],
      serveStaticOptions: {
        redirect: false
      }
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    RouterModule.register([
      {
        path: "incident",
        module: IncidentModule
      },
      {
        path: "users",
        module: UsersModule
      },
      {
        path: "auth",
        module: AuthModule
      },
      {
        path: "setting",
        module: SettingModule
      },
    ])
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule { }
