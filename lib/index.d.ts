export declare const listFiles: (type: string, folderId?: string) => Promise<any>;
export default class googleDrive {
    static _instance: googleDrive;
    static getInstance(): googleDrive;
    static auth(type: string, folderId?: string): Promise<any>;
    static listFiles(type: string, folderId?: string): Promise<any>;
}
