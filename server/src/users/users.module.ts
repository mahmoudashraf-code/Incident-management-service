import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.schemas';

@Module({
  providers: [
    UsersService,
  ],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ])
  ],
  controllers: [
    UsersController
  ],
  exports: [
    UsersService,
  ]
})
export class UsersModule {
  constructor(private users: UsersService) { }
  async onModuleInit() {
    if (await this.users.userModel.findOne({ role: 0 }) == null) {
      this.users.create({
        role: 0,
        email: "admin@gmail.com",
        password: "1234",
        name: "Mahmoud Ashraf"
      })
      this.users.create({
        role: 1,
        email: "angular@developer.com",
        password: "1234",
        name: "Hassan Ashraf"
      })
      this.users.create({
        role: 1,
        email: "server@developer.com",
        password: "1234",
        name: "Ahmed Ashraf"
      })
      this.users.create({
        role: 1,
        email: "serler@person.com",
        password: "1234",
        name: "Ali Ashraf"
      })
    }
  }
}
