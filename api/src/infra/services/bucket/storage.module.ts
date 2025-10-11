import { Module } from "@nestjs/common";
import { BucketServiceImpl } from "./impl/bucket.service.impl";

@Module({
  providers: [
    {
      provide: "BucketService",
      useClass: BucketServiceImpl,
    },
  ],
  exports: ["BucketService"],
})
export class BucketModule {}
