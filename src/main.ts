import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(3001);
    console.log('NestJS is running on http://localhost:3001');
  } catch (err) {
    console.error('NestJS failed to start:', err);
  }
}
bootstrap();
