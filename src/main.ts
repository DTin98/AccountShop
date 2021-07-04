import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from "./shared/pipes/validation.pipe";
import * as morgan from "morgan";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(morgan("tiny"));

  const config = new DocumentBuilder()
    .setTitle("Account Shop")
    .setDescription("The Account Shop API description")
    .setVersion("1.0")
    .addTag("accountShop")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(8080);
}
bootstrap();
