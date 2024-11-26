import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type FlashCardListDocument = FlashCardList & Document;

@Schema()
export class FlashCardList {
    @Prop({ type: String })
    listName?: string;

    @Prop({ type: String })
    listDescription?: string;
}

export const FlashCardListSchema = SchemaFactory.createForClass(FlashCardList);
