import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from "express";
import { iUser } from './users.dto';
import { SessionGuard } from 'src/session.guard';

@Controller()
@UseGuards(SessionGuard)
export class UsersController {
    constructor(
        private users: UsersService,
    ) { }

    @Post()
    create(@Body("user") user: iUser, @Res() res: Response) {
        this.users.create(user);
        res.end();
    }

    @Get()
    async getAll(@Res() res: Response) {
        res.json(await this.users.getAll());
    }

    @Get("users")
    async getAllUers(@Res() res: Response) {
        res.json(await this.users.userModel.find({ role: 1 }).exec());
    }

    @Get(":id")
    async get(@Res() res: Response, @Param('id') id: string) {
        res.json(await this.users.findOneById(id));
    }

    @Delete(':id')
    deleteDir(@Param('id') id: string, @Res() res: Response) {
        this.users.delete(id);
        res.end();
    }

    @Put(':id')
    update(@Param('id') id: string, @Body("user") user: iUser, @Res() res: Response) {
        this.users.update(id, user);
        res.end();
    }
}
