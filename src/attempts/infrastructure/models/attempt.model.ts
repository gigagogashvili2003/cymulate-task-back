import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AttemptDocument = HydratedDocument<Attempt>;

export enum AttemptStatus {
  Clicked,
  NotClicked,
}

@Schema()
export class Attempt {
  @Prop({ required: true, trim: true, lowercase: true })
  sender: string;

  @Prop({ required: true, trim: true, lowercase: true })
  receiver: string;

  @Prop({ required: true, minlength: 1, maxlength: 250 })
  content: string;

  @Prop({ required: true, default: AttemptStatus.NotClicked, enum: AttemptStatus })
  status: AttemptStatus;
}

export const AttemptSchema = SchemaFactory.createForClass(Attempt);
