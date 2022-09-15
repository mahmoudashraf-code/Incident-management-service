import { Body, Controller, Post, Res, UseGuards, Get, Put, Param, Delete } from '@nestjs/common';
import e, { Response } from "express";
import { iIncident } from './incident.interface';
import { SessionGuard } from 'src/session.guard';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Incident, IncidentDocument } from './incident.schemas';

@Controller()
@UseGuards(SessionGuard)
export class IncidentController {

    constructor(@InjectModel(Incident.name) public IncidebtModel: Model<IncidentDocument>) { }

    // @Get()
    // async get(@Res() res: Response) {
    //     res.json(await this.IncidebtModel.find().exec());
    // }

    @Get(":id")
    async getById(@Res() res: Response, @Param('id') id: string) {
        res.json(await this.IncidebtModel.findOne({ _id: id }).exec());
    }

    @Post("filter")
    async getByFilter(@Res() res: Response, @Body("filter") filter: iIncident) {
        res.json(await this.IncidebtModel.find(filter).exec());
    }

    @Post()
    async addNew(@Body("data") data: iIncident, @Res() res: Response) {
        data.dateCreate = new Date().toDateString();
        this.checkStatus(data);
        await this.IncidebtModel.create(data);
        res.json(true);
    }

    @Put(":id")
    async update(@Body("data") data: iIncident, @Res() res: Response, @Param('id') id: string) {
        data.dateUpdate = new Date().toDateString();
        this.checkStatus(data);
        await this.IncidebtModel.findOneAndUpdate({ _id: id }, data);
        res.json(true);
    }

    @Delete(":id")
    async delete(@Res() res: Response, @Param('id') id: string) {
        await this.IncidebtModel.findByIdAndRemove({ _id: id }).exec()
        res.json(true);
    }

    checkStatus(ele: iIncident) {
        if (ele.replay && ele.replay != '') {
            3
            ele.status = 2;
        } else if (ele.assignTo && ele.assignTo != "") {
            ele.status = 1;
        } else ele.status = 0;
    }
}
