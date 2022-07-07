import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setSwagger } from './setSwagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setSwagger(app);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
