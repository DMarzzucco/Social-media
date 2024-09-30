import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from "morgan"
import { CORS } from './constants';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'))
  app.useGlobalPipes(new ValidationPipe({
    transformOptions: {
      enableImplicitConversion: true,
    }
  }))
  const reflector = app.get(Reflector)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector))

  app.enableCors(CORS);
  app.setGlobalPrefix("api")
  // 
  // console.log (process.env.NODE_ENV)
  // const configureService = app.get(ConfigService)
  // console.log(configureService.get('ND'))
  // 
  const config = new DocumentBuilder()
    .setTitle('R O L E S / / A P P')
    .setDescription('Api REST with roles and auth')
    .setVersion("1.0")
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3001


  await app.listen(port);
  console.log(`port listen in ${port}`)
}
bootstrap();