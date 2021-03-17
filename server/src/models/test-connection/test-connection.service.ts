import { Injectable } from "@nestjs/common";

@Injectable()
export class TestConnectionService {
    constructor(
    ) { }

    async auth() {
        return {
            message: "Подключение установлено!"
        }
    }
}