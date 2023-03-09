import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class BaseAPIDocumentation {
    public builder = new DocumentBuilder();

    initializeOptions() {
        return this.builder
            .setTitle('Swagger Example')
            .setDescription('Swagger study API description')
            .setVersion('1.0.0')
            .addTag('swagger')
            .build();
    }
}
