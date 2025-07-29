import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Readable } from 'stream';

@Injectable()
export class AwsS3Service {
    private bucketname
    private s3
    
    constructor(){
        this.bucketname = process.env.MY_AWS_BUCKETNAME
        this.s3 = new S3Client({
            credentials :{
                accessKeyId : process.env.MY_AWS_ACCESS_KEY!,
                secretAccessKey : process.env.MY_AWS_SECRET_ACCESS_KEY!
            },
            region : process.env.MY_AWS_REGION
        })
    }

    async uploadPdf(fileId , file){
        if(!fileId || !file) throw new BadRequestException("file is required")

        const config = {
            Key : fileId,
            Body : file.buffer,
            Bucket: this.bucketname,
            ContentType : file.mimetype
        }     

        const uploadCommand = new PutObjectCommand(config)

        await this.s3.send(uploadCommand)
        return fileId
    }

    async getFileById(fileId : string){
        if(!fileId ) throw new BadRequestException("file is required")

            const config = {
                Key : fileId,
                Bucket: this.bucketname,
            }     
    
            const getCommand = new GetObjectCommand(config)
            const fileStream = await this.s3.send(getCommand)

            if (fileStream.Body instanceof Readable) {
                const chunks: Buffer[] = []
                for await (const chunk of fileStream.Body) {
                    chunks.push(chunk)
                }
                const fileBuffer = Buffer.concat(chunks)
                const base64 = fileBuffer.toString('base64')
                const file = `data:${fileStream.ContentType};base64,${base64}`
                return file
            }
    }

    async deleteFileById(fileId : string ){
        if(!fileId ) throw new BadRequestException("file is required")

            const config = {
                Key : fileId,
                Bucket: this.bucketname,
            }     
    
            const deleteCommand = new DeleteObjectCommand(config)
             await this.s3.send(deleteCommand)
             return fileId
    }
}
