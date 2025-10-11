export interface StorageService {
  uploadFile(file: Buffer, mimeType: string, key: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
  getFileUrl(key: string): Promise<string>;
}
