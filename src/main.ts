import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


const PORT = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => {
    console.log(`App started: http://127.0.0.1:${PORT}`);
  });
}
bootstrap();
