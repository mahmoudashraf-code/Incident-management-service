import { IncidentController } from './incident.controller';
import { Module } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Incident, IncidentDocument, IncidentSchema } from './incident.schemas';
import { Model } from 'mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Incident.name,
                schema: IncidentSchema
            }
        ])
    ],
    controllers: [
        IncidentController
    ],
    providers: [],
})
export class IncidentModule {
    constructor(@InjectModel(Incident.name) public incidentModel: Model<IncidentDocument>) { }
    async onModuleInit() {
        if ((await this.incidentModel.find().exec()).length == 0) {
            this.incidentModel.create({
                title: 'server not respone',
                status: 0,
                dateCreate: new Date().toDateString(),
                description: "any fake data for description",
                callerName: 'Mahmoud Ashraf',
                callerPhone: '201111188260'
            })
            this.incidentModel.create({
                title: 'add users not work',
                status: 0,
                dateCreate: new Date().toDateString(),
                description: "any fake data for description",
                callerName: 'Ali Ashraf',
                callerPhone: '201111188260'
            })
            this.incidentModel.create({
                title: 'enter to dashboard not work',
                status: 0,
                dateCreate: new Date().toDateString(),
                description: "any fake data for description",
                callerName: 'Ahmed Ashraf',
                callerPhone: '201111188260'
            })
        }
    }
}
