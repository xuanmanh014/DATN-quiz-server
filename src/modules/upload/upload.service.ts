import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Upload, UploadDocument } from './entities/upload.entity';
import { Model } from 'mongoose';
import * as admin from 'firebase-admin';
import { Response } from '../../common/interceptors/transform.interceptors';
import { firebaseAdmin } from '../../firebase/firebaseAdmin';

@Injectable()
export class UploadService {
    constructor(
        @InjectModel(Upload.name)
        private uploadModel: Model<UploadDocument>
    ) { }

    private bucket = firebaseAdmin.storage().bucket();

    async uploadFile(file: Express.Multer.File): Promise<Upload> {
        const fileName = `${Date.now()}-${file.originalname}`;
        const fileUpload = this.bucket.file(fileName);

        try {
            await fileUpload.save(file.buffer, {
                contentType: file.mimetype,
            });

            await fileUpload.makePublic();

            const url = fileUpload.publicUrl();

            const fileUploaded = new this.uploadModel({
                fileName,
                filePath: url,
                fileSize: file.size,
                fileType: file.mimetype
            });

            await fileUploaded.save();

            return fileUploaded;
        } catch (error) {
            throw new Error('Error uploading file: ' + error.message);
        }
    }

    async deleteFile(id: string): Promise<Upload> {
        try {
            const existFile = await this.uploadModel.findById(id);

            if (!existFile) {
                throw new Error("Delete file failed!");
            }

            const bucket = admin.storage().bucket();
            const file = bucket.file(existFile.fileName);

            await file.delete();

            const deletedFile = await this.uploadModel.findByIdAndDelete({ _id: id });

            return deletedFile
        } catch (error) {
            throw new BadGatewayException();
        }
    }
}
