import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Post extends Document {
  @Prop({ type: String, index: true, unique: true, required: true })
  title: string

  @Prop({ required: true })
  body: string

  @Prop()
  photo: string

  @Prop({ type: Date, default: Date.now })
  createdAt: Date

  @Prop({ min: 0, max: 5 })
  raiting: number

  @Prop({ default: 0 })
  views: number
}

export const PostSchema = SchemaFactory.createForClass(Post)
