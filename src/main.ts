import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import * as dotenv from "dotenv";

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("/api/v1");
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({ origin: "*" });
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.listen(process.env.PORT || 8888);
}
bootstrap();
