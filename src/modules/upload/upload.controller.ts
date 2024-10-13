import { Controller, Delete, Param, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { UploadService } from "./upload.service";
import { Response } from "../../interceptors/transform.interceptors";
import { Upload } from "./entities/upload.entity";
import { AuthGuard } from "../auth/auth-guard";

@Controller('upload')
export class UploadController {
    constructor(
        private readonly uploadService: UploadService
    ) { }

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<Response<Upload>> {
        try {
            const fileUpload = await this.uploadService.uploadFile(file);

            return {
                message: "Upload file success!",
                data: fileUpload
            };
        } catch (error) {
            return {
                message: "Upload file failed!",
                data: null
            };
        }
    }

    @Delete(":id")
    @UseGuards(AuthGuard)
    async deleteFile(@Param("id") id: string): Promise<Response<any>> {
        try {
            const deletedFile = await this.uploadService.deleteFile(id);

            if (!deletedFile.data) {
                throw new Error("Delete file failed!");
            }

            return {
                message: "Delete file success!",
                data: null
            }
        } catch (error) {
            return {
                message: "Delete file failed!",
                data: null
            }
        }
    }
}