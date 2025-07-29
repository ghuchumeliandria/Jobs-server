export declare class AwsS3Service {
    private bucketname;
    private s3;
    constructor();
    uploadPdf(fileId: any, file: any): Promise<any>;
    getFileById(fileId: string): Promise<string | undefined>;
    deleteFileById(fileId: string): Promise<string>;
}
