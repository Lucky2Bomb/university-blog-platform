import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { TestConnectionService } from "./test-connection.service";

@Controller("/test")
export class TestConnectionController {

    constructor(private testConnectionService: TestConnectionService) { }

    @Get("/auth")
    auth() {
        return this.testConnectionService.auth();
    }
}