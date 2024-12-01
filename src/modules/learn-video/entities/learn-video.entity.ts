import mongoose, { Document } from "mongoose";
import { Upload } from "../../upload/entities/upload.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type TextSegment = {
    start: number;
    end: number;
    text: string;
};

export type VideoSection = {
    start: number;
    end: number;
    segments: TextSegment[];
};

export type LearnVideoDocument = Document & LearnVideo;

@Schema()
export class LearnVideo {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String })
    speaker: string;

    @Prop({ type: String })
    description: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Upload.name })
    video: Upload;

    @Prop({
        type: [{
            start: Number,
            end: Number,
            segments: [{
                start: Number,
                end: Number,
                text: String,
            }]
        }], required: true
    })
    videoSections: VideoSection[];
}

export const LearnVideoSchema = SchemaFactory.createForClass(LearnVideo);
