import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import config from "config";
import { Request, Response } from 'express';
import { RoleList } from "src/models/role/role-list";
const jsonwebtoken = require('jsonwebtoken');

export function RoleMiddleware(role) {
    return function (req, res, next: () => void) {
        {
            try {
                if(req.isAdmin) {
                    next();
                }
                const userRoles = req.userRoles;
                if (!userRoles) {
                    throw new BadRequestException("нет доступа");
                }
                if (userRoles.includes(RoleList[role])) {
                    next();
                } else {
                    throw new BadRequestException("нет доступа");
                }


            } catch (error) {
                throw new BadRequestException("нет доступа");
            }
        }

    }
}