import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import config from "config";
import { Request, Response } from 'express';
import { RoleList } from "src/models/role/role-list";
import { IDecodedTokenStructure } from "src/models/user/interface/IDecodedTokenStructure";
import jsonwebtoken = require('jsonwebtoken');

export async function CompareUserIdBodyAndTokenUserIdMiddleware(req, res, next: () => void) {
    {
        if (req.method === "OPTIONS") {
            next();
        }
        try {

            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                throw new BadRequestException("не авторизован");
            }
            const decodedTokenData: IDecodedTokenStructure = await jsonwebtoken.verify(token, config.secret_key);
            if(Number(req.body.userId) !== Number(decodedTokenData.userId))  {
                throw new BadRequestException("body.userId не совпадают с вашей сессией");
            }
            next();
        } catch (error) {
            console.log(error)
            throw new BadRequestException("не авторизован");
        }
    }
}