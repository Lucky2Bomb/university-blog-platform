import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import config from "config";
import { Request, Response } from 'express';
import { RoleList } from "src/models/role/role-list";
const jsonwebtoken = require('jsonwebtoken');

export function RoleMiddleware(role: RoleList) {
    return async function (req, res, next: () => void) {
        {
            try {
                const userRoles: RoleList[] = await req.body.userRoles;
                if (!userRoles) {
                    throw new BadRequestException("нет доступа");
                }

                let isRole = false;
                userRoles.forEach(roleItem => isRole = (roleItem === RoleList.ADMIN) || (roleItem === role));
                if (isRole) {
                    next();
                } else {
                    throw new BadRequestException("нет доступа");
                }


            } catch (error) {
                console.log(error);
                throw new BadRequestException("нет доступа");
            }
        }

    }
}