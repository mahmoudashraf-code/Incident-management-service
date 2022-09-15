import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingDocument = Setting & Document;

@Schema()
export class Setting {
    @Prop({ required: true })
    id: string;

    @Prop({ required: true })
    category: string[];

    @Prop({ required: true })
    priorty: string[];
}
export const SettingSchema = SchemaFactory.createForClass(Setting);
