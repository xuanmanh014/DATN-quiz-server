import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UploadDocument = Upload & Document;

@Schema()
export class Upload {
    @Prop({ required: false })
    fileName?: string

    @Prop({ required: false })
    filePath?: string

    @Prop({ required: false })
    fileSize?: number

    @Prop({ required: false })
    fileType?: string
};

export const UploadSchema = SchemaFactory.createForClass(Upload);
