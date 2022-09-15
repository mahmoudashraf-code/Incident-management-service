import { Injectable, NotFoundException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UsersService } from "src/users/users.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(public readonly usersService: UsersService) {
        super({
            usernameField: 'email',
        })
    }
    async validate(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(email, password);
        if (!user) {
            throw new NotFoundException(104);
        }
        return user;
    }
}