import { Module, Global } from "@nestjs/common";
import { Logger } from "./logger.service";

@Global()
@Module({
  providers: [
    {
      provide: "CUSTOM_LOGGER",
      useFactory: () => {
        return new Logger();
      },
    },
    Logger,
  ],
  exports: ["CUSTOM_LOGGER", Logger],
})
export class LoggerModule {}
