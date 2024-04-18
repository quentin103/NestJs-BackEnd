import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: Boolean(process.env.WHITE_LIST_VALIDATION),
    }),
  );
  // const port = process.env.PORT || 3000;
  // app.listen(port, () => {
  //   console.log(`App listening on port: ${port}`);
  // });
  await app.listen(3000);
}
bootstrap();
