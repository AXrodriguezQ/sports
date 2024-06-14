import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config/config';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  const PORT = config().nest.port

  app.enableCors()

  app.setGlobalPrefix('/api/v1')

  app.useGlobalPipes()

  await app.listen(PORT);

  console.log(`App is listening in: http://localhost:${PORT}/api/v1/`);

}

bootstrap();
