import { IncidentController } from './incident.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Incident, IncidentSchema } from './incident.schemas';

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
export class IncidentModule { }
