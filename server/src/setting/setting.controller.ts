import { Body, Controller, Post, Res, UseGuards, Get } from '@nestjs/common';
import { Response } from "express";
import { iSetting } from './setting.interface';
import { SessionGuard } from 'src/session.guard';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Setting, SettingDocument } from './setting.schemas';

@Controller()
@UseGuards(SessionGuard)
export class SettingController {

    constructor(@InjectModel(Setting.name) public settingModel: Model<SettingDocument>) { }

    @Get()
    async get(@Res() res: Response) {
        res.json(await this.settingModel.findOne({ id: "notChange" }).exec());
    }

    @Post()
    async saveSetting(@Body("setting") setting: iSetting, @Res() res: Response) {
        await this.settingModel.findOneAndUpdate({ id: "notChange" }, setting);
        res.json(true);
    }
}
