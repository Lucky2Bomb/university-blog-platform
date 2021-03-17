import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { TestConnectionController } from "./test-connection.controller";
import { TestConnectionService } from './test-connection.service';

@Module({
    controllers: [TestConnectionController],
    providers: [TestConnectionService]
})

export class TestConnectionModule { }