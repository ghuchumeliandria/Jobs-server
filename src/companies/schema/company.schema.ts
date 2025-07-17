import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({timestamps : true})
export class Company{
    @Prop({
        type: String,
        required: true
    })
    fullName: string;

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
        required : true
    })
    description : string

    @Prop({
        type : String,
        required : false,
        default : 'pending'
    })
    status : 'pending' | 'approved' | 'rejected'

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
        ref: 'vacancy',
        default: []
    })
    vacansies: mongoose.Schema.Types.ObjectId[];
}

@Schema({timestamps : true})
export class Vacancy{
    @Prop({
        type: String,
        required: true
    })
    name: string;

    @Prop({
        type: Number,
        required: true
    })
    sallery: number;

    @Prop({
        type : String,
        required : true
    })
    description : string

    @Prop({
        type : String,
        required : true,
    })
    location : string
    @Prop({
        type : String,
        required : false,
        default : 'pending'
    })
    status : 'pending' | 'approved' | 'rejected'

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company',
        required: false,
    })
    company: mongoose.Schema.Types.ObjectId;

    @Prop({
        type: [{
            file: String,
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
        }],
        default : []
    })
    resumes: {
        file: string;
        user: mongoose.Schema.Types.ObjectId;
      }[];
}

export const companySchema = SchemaFactory.createForClass(Company)
export const vacancySchema = SchemaFactory.createForClass(Vacancy)