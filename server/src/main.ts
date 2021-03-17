import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import config from 'config';
import { AppModule } from './app.module';

const start = async () => {
    try {
        const PORT = process.env.PORT || config.serverPort;
        const app = await NestFactory.create(AppModule);
        app.enableCors();
        app.useGlobalPipes(new ValidationPipe());
        await app.listen(PORT, () => console.log(`server started on port ${PORT}.`));
    } catch (error) {
        console.log(error);
    }
};

start();