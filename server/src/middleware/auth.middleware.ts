import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import config from "config";
import { Request, Response } from 'express';
import { RoleList } from "src/models/role/role-list";
import { IDecodedTokenStructure } from "src/models/user/interface/IDecodedTokenStructure";
const jsonwebtoken = require('jsonwebtoken');

export async function AuthMiddleware(req, res, next: () => void) {
    {
        if (req.method === "OPTIONS") {
            next();
        }

        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                throw new BadRequestException("не авторизован");
            }
            const decodedTokenData: IDecodedTokenStructure = jsonwebtoken.verify(token, config.secret_key);
            const isAdmin: RoleList = decodedTokenData.userRoles.find((item) => item === RoleList.ADMIN);
            
            if(isAdmin) {
                req.isAdmin = true;
                next();
            }
            req.userRoles = decodedTokenData.userRoles;
            next();
        } catch (error) {
            throw new BadRequestException("не авторизован");
        }
    }
}