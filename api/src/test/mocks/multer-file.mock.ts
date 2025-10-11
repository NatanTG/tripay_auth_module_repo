import { faker } from "@faker-js/faker";

export const multerFileMock = (filename?: string): Express.Multer.File => ({
  fieldname: "file",
  originalname: filename || `${faker.system.fileName()}.pdf`,
  encoding: "7bit",
  mimetype: "application/pdf",
  size: faker.number.int({ min: 1024, max: 10485760 }),
  buffer: Buffer.from(`fake ${filename || "file"} data`),
  destination: "",
  filename: "",
  path: "",
  stream: null as any,
});
