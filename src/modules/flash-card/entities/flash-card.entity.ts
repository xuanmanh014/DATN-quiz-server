import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { FlashCardList } from "../../flash-card-list/entities/flash-card-list.entity";

export type FlashCardDocument = FlashCard & Document;

@Schema()
export class FlashCard {
    @Prop({ type: String })
    cardName?: string;

    @Prop({ type: String })
    wordEMean?: string;

    @Prop({ type: String })
    wordVMean?: string;

    @Prop({ type: String })
    wordType?: string;

    @Prop({ type: String })
    wordIPA?: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: FlashCardList.name })
    cardList?: FlashCardList;

    @Prop({ type: String })
    wordExample?: string;
}

export const FlashCardSchema = SchemaFactory.createForClass(FlashCard);