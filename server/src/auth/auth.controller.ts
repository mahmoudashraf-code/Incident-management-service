import { Controller, Get, NotFoundException, Post, Req, Res, Session, UseGuards } from '@nestjs/common';
import { Request, Response } from "express";
import { Session as inter } from 'express-session';
import { SessionGuard } from 'src/session.guard';
import { UsersService } from 'src/users/users.service';
import { iUser } from '../users/users.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
    constructor(
        public readonly usersService: UsersService,
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req: Request, @Session() session: Record<string, any>) {
        let user: iUser = req.user as iUser;
        session.user = user;
        return {
            user
        };
    }

    @Get('validToken')
    async validToken(@Session() session: Record<string, any>) {
        if (!session.user) {
            throw new NotFoundException(104);
        }
        let user: iUser = await this.usersService.findOneById(session.user._id)
        session.user = user;
        return {
            user: session.user,
        };
    }

    @UseGuards(SessionGuard)
    @Post('logout')
    async logout(@Session() session: inter, @Res() res: Response) {
        session.destroy(() => {
            res.json({
                sucess: true
            })
        });
    }
}
