import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Mongoose } from "mongoose";
@Schema({timestamps : true})
export class User {
    @Prop({
        type : String,
        required : true
    })
    fullName : string
    @Prop({
        type : String,
        required : true
    })
    email : string
    @Prop({
        type : String,
        required : true,
        select : false
    })
    password : string
    @Prop({
        type : String,
        required : true,
        default : "USER"
    })
    role : string
    @Prop({
        type : String,
        required : false,
        default : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    })
    avatar : string

    @Prop({
        type: [mongoose.Schema.Types.ObjectId],
        default : []
    })
    applies : mongoose.Schema.Types.ObjectId[]
}

export const userSchema = SchemaFactory.createForClass(User)