import { NestFactory } from '@nestjs/core';
import { Logger } from "@nestjs/common";
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = process.env.SERVER_PORT
    await app.listen(port);

    Logger.log(`Application listening on port ${port}`);
}
bootstrap();
