import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import config from "config";
import { Request, Response } from 'express';
import { IDecodedTokenStructure } from "src/models/user/interface/IDecodedTokenStructure";
const jsonwebtoken = require('jsonwebtoken');

export async function AddUserIdInBodyMiddleware(req, res, next: () => void) {
    {
        if (req.method === "OPTIONS") {
            next();
        }

        try {
            const token = req.headers.authorization.split(' ')[1];
            if (typeof token === "undefined" || !token) {
                throw new BadRequestException("ошибка при получении userId");
            }
            const decodedTokenData: IDecodedTokenStructure = jsonwebtoken.verify(token, config.secret_key);
            req.body.userId = Number(decodedTokenData.userId);
            next();
        } catch (error) {
            throw new BadRequestException("ошибка при получении userId");
        }
    }
}

export async function CompareQueryUserIdAndTokenMiddleware(req, res, next: () => void) {
    {
        if (req.method === "OPTIONS") {
            next();
        }

        try {
            const token = req.headers.authorization.split(' ')[1];
            if (typeof token === "undefined" || !token) {
                throw new BadRequestException("ошибка при получении userId");
            }
            const decodedTokenData: IDecodedTokenStructure = jsonwebtoken.verify(token, config.secret_key);
            if (Number(decodedTokenData.userId) !== Number(req.body.userId)) {
                throw new BadRequestException("указан не свой userId");
            }
            next();
        } catch (error) {
            throw new BadRequestException("ошибка при получении userId");
        }
    }
}


export async function CompareBodyUserIdAndTokenMiddleware(req, res, next: () => void) {
    {
        if (req.method === "OPTIONS") {
            next();
        }

        try {
            const token = req.headers.authorization.split(' ')[1];
            if (typeof token === "undefined" || !token) {
                throw new BadRequestException("ошибка при получении userId");
            }
            const decodedTokenData: IDecodedTokenStructure = jsonwebtoken.verify(token, config.secret_key);
            if (Number(decodedTokenData.userId) !== Number(req.body.userId)) {
                throw new BadRequestException("указан не свой userId");
            }
            next();
        } catch (error) {
            throw new BadRequestException("ошибка при получении userId");
        }
    }
}

export async function PushUserIdInQueryByTokenMiddleware(req, res, next: () => void) {
    {
        if (req.method === "OPTIONS") {
            next();
        }

        try {
            
            const token = req.headers.authorization.split(' ')[1];
            if (typeof token === "undefined" || !token) {
                throw new BadRequestException("ошибка при получении userId");
            }
            const decodedTokenData: IDecodedTokenStructure = await jsonwebtoken.verify(token, config.secret_key);
            if (!decodedTokenData.userId) {
                throw new BadRequestException("указан не свой userId");
            }
            req.query.userId = Number(decodedTokenData.userId);
            next();
        } catch (error) {
            throw new BadRequestException("ошибка при получении токена");
        }
    }
}
