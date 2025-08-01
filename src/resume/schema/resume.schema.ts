import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
@Schema({timestamps : true})
export class Resumes {
    
    @Prop({
        type : String,
    })
    user : string
    @Prop({
        type : String,
    })
    fileId : string
}

export const resumeSchema = SchemaFactory.createForClass(Resumes)