import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";

export enum FileType {
    IMAGE = "image",
    FILE = "file"
}

export enum SectionType {
    PUBLICATION = "publication",
    PROFILE = "profile"
}

@Injectable()
export class FileService {

    createFile(userId: number, section: SectionType, type: FileType, file): string {
        try {
            const fileExtension = file.originalname.split(".").pop();
            const fileName = `${uuid.v4()}.${fileExtension}`;
            const filePath = path.resolve(__dirname, "..", "..", "static", String(userId), section, type);
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }
            fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
            return `${String(userId)}/${section}/${type}/${fileName}`;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    removeFile(fileName: string) {
        try {
            const filePath = path.resolve(__dirname, "..", "..", "static", fileName);
            if(fs.existsSync(filePath)){
                fs.unlinkSync(filePath);
            }
            return `${filePath.split("/").pop()} was delete`;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}