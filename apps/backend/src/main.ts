import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BaseAPIDocumentation } from './config/swagger.document';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = process.env.SERVER_PORT;
    const configService = app.get(ConfigService);

    const prisma: PrismaService = app.get(PrismaService);
    prisma.enableShutdownHook(app);

    const documentOption = new DocumentBuilder()
    .setTitle('QR Kiosk API')
    .setDescription('QR Kiosk API backend api')
    .setVersion('1.0')
    .addTag('api')
    .build();

    const document = SwaggerModule.createDocument(app, documentOption);
    SwaggerModule.setup('api-docs', app, document);

    await app.listen(configService.get('SERVER_PORT'));

    Logger.log(`Application listening on port ${port}`);
}
bootstrap();
