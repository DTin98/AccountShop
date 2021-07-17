import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from "./shared/pipes/validation.pipe";
import * as morgan from "morgan";
import * as helmet from "helmet";
import { join } from "path";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    logger: true,
  });
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.use(morgan("tiny"));
  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  app.setViewEngine("hbs");
  app.setGlobalPrefix("api");

  // const config = new DocumentBuilder()
  //   .setTitle("Account Shop")
  //   .setDescription("The Account Shop API description")
  //   .setVersion("1.0")
  //   .addTag("accountShop")
  //   .addBearerAuth()
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup("", app, document);

  await app.listen(8080);
}
bootstrap();
