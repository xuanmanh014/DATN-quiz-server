import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Upload, UploadDocument } from './entities/upload.entity';
import { Model } from 'mongoose';
import { bucket } from '../../firebase/firebaseAdmin';
import * as admin from 'firebase-admin';
import { Response } from '../../interceptors/transform.interceptors';

@Injectable()
export class UploadService {
    constructor(
        @InjectModel(Upload.name)
        private uploadModel: Model<UploadDocument>
    ) { }

    async uploadFile(file: Express.Multer.File): Promise<Upload> {
        const fileName = `${Date.now()}-${file.originalname}`;
        const fileUpload = bucket.file(fileName);

        try {
            await fileUpload.save(file.buffer, {
                contentType: file.mimetype,
            });
            const url = await fileUpload.getSignedUrl({
                action: 'read',
                expires: '03-01-2500',
            });

            const fileUploaded = new this.uploadModel({
                fileName,
                filePath: url[0],
                fileSize: file.size,
                fileType: file.mimetype
            });

            await fileUploaded.save();

            return fileUploaded;
        } catch (error) {
            throw new Error('Error uploading file: ' + error.message);
        }
    }

    async deleteFile(id: string): Promise<Response<Upload>> {
        try {
            const existFile = await this.uploadModel.findById(id);

            if (!existFile) {
                throw new Error("Delete file failed!");
            }

            const bucket = admin.storage().bucket();
            const file = bucket.file(existFile.fileName);

            await file.delete();

            const deletedFile = await this.uploadModel.findByIdAndDelete({ _id: id });

            return {
                message: "Delete file success!",
                data: deletedFile
            };
        } catch (error) {
            return {
                message: "Delete file failed!",
                data: null
            };
        }
    }
}
