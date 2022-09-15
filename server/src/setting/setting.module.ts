import { SettingController } from './setting.controller';
import { Module } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Setting, SettingDocument, SettingSchema } from './setting.schemas';
import { Model } from 'mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Setting.name,
                schema: SettingSchema
            }
        ])
    ],
    controllers: [
        SettingController
    ],
    providers: [],
})
export class SettingModule {
    constructor(@InjectModel(Setting.name) public settingModel: Model<SettingDocument>) { }
    async onModuleInit() {
        if (await this.settingModel.findOne({ id: "notChange" }) == null)
            this.settingModel.create({
                id: "notChange",
                category: ["server shutdown", "mobile app bugs", "problem in dashboard"],
                priorty: ["low", "medium", "high"]
            })
    }
}
