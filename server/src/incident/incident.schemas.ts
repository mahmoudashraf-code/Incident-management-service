import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IncidentDocument = Incident & Document;

@Schema()
export class Incident {
    @Prop()
    assignTo: string;

    @Prop({ required: true })
    title: string;

    @Prop()
    category: string;

    @Prop()
    priorty: string;

    @Prop({ required: true })
    status: number;

    @Prop({ required: true })
    description: string;

    @Prop()
    replay: string;

    @Prop({ required: true })
    callerPhone: string;

    @Prop({ required: true })
    callerName: string;

    @Prop({ required: true })
    dateCreate: string;

    @Prop()
    dateUpdate: string;
}
export const IncidentSchema = SchemaFactory.createForClass(Incident);
