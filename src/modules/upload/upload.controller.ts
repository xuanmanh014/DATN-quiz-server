import { BadRequestException, Controller, Delete, Param, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { UploadService } from "./upload.service";
import { Response } from "../../common/interceptors/transform.interceptors";
import { Upload } from "./entities/upload.entity";
import { AuthGuard } from "../../common/guards/auth.guard";

@Controller('upload')
export class UploadController {
    constructor(
        private readonly uploadService: UploadService
    ) { }

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<Response<Upload>> {
        const fileUpload = await this.uploadService.uploadFile(file);

        if (!fileUpload) throw new BadRequestException();

        return {
            message: "Upload file success!",
            data: fileUpload
        };
    }

    @Delete(":id")
    @UseGuards(AuthGuard)
    async deleteFile(@Param("id") id: string): Promise<Response<any>> {
        try {
            const deletedFile = await this.uploadService.deleteFile(id);

            if (!deletedFile) {
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