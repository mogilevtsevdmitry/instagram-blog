import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'
import { User } from 'src/user/user.schema'

@Schema()
export class Post extends Document {
  @Prop({ index: true, unique: true, required: true })
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

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  user: User
}

export const PostSchema = SchemaFactory.createForClass(Post)
