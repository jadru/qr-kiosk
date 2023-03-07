import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BaseAPIDocumentation } from './config/swagger.document';
import { PrismaService } from '../prisma/prisma.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = process.env.SERVER_PORT;

    const prisma: PrismaService = app.get(PrismaService);
    prisma.enableShutdownHook(app);

    const documentOption = new BaseAPIDocumentation().initializeOptions();
    const document = SwaggerModule.createDocument(app, documentOption);
    SwaggerModule.setup('api-docs', app, document);

    await app.listen(port);
    Logger.log(`Application listening on port ${port}`);
}
bootstrap();
